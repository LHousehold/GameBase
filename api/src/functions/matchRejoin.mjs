import { app, input, output } from "@azure/functions";

const cosmosInput = input.cosmosDB({
  databaseName: "householdDb",
  containerName: "gamesContent",
  sqlQuery: "SELECT * from c where c.matchId = {matchId}",
  connection: "MyAccount_COSMOSDB",
});

/*
Match knows who you are; rejoining is fetching your metadata
*/

app.http("matchRejoin", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [cosmosInput],
  route: "match/{matchId}/players/{playerId}",
  handler: async (request, context) => {
    const { playerId } = request.params;

    const cookiesString = request.headers.get("cookie");
    const cookies = cookiesString.split(";");
    const playerSecretCookie = cookies.find(
      (c) => c.split("=")[0] === "playerSecret",
    );
    const playerSecret = playerSecretCookie.split("=")[1];

    const matchDocs = context.extraInputs.get(cosmosInput);

    const matchDoc = matchDocs.find((d) => d.id.includes("-doc"));
    const playerDoc = matchDocs.find((d) => d.id === playerId);
    const secretsDoc = matchDocs.find((d) => d.id.includes("-secrets"));

    if (secretsDoc.playerSecrets[playerId] !== playerSecret) {
      return {
        body: JSON.stringify({
          error: "Player is not authenticated as original.",
        }),
        status: 400,
      };
    }

    const response = {
      body: JSON.stringify({ matchDoc, playerDoc }),
    };

    return response;
  },
});
