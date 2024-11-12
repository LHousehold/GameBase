import { app, input } from "@azure/functions";

const signalRConnection = input.generic({
  type: "signalRConnectionInfo",
  hubName: "gameHub",
  connection: "Games_SIGNALR",
  connectionStringSetting: "Games_SIGNALR",
  userId: "{Query.playerId}",
});

const cosmosInput = input.cosmosDB({
  databaseName: "householdDb",
  containerName: "gamesContent",
  sqlQuery: "SELECT * from c where c.matchId = {matchId}",
  connection: "MyAccount_COSMOSDB",
});

app.http("negotiate", {
  methods: ["POST"],
  authLevel: "anonymous",
  extraInputs: [signalRConnection, cosmosInput],
  handler: async (request, context) => {
    const playerId = request.query.get("playerId");

    const cookiesString = request.headers.get("cookie");
    const cookies = cookiesString.split(";");
    const playerSecretCookie = cookies.find(
      (c) => c.split("=")[0] === "playerSecret",
    );
    const playerSecret = playerSecretCookie.split("=")[1];

    const matchDocs = context.extraInputs.get(cosmosInput);

    const secretsDoc = matchDocs.find((d) => d.id.includes("-secrets"));

    if (secretsDoc.playerSecrets[playerId] !== playerSecret) {
      return {
        body: JSON.stringify({
          error: "Player is not authenticated as original.",
        }),
        status: 400,
      };
    }

    const response = JSON.stringify(context.extraInputs.get(signalRConnection));
    return {
      body: response,
    };
  },
});
