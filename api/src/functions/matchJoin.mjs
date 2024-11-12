import { app, input, output } from "@azure/functions";
import { v4 as uuidv4 } from "uuid";

const cosmosInput = input.cosmosDB({
  databaseName: "householdDb",
  containerName: "gamesContent",
  sqlQuery: "SELECT * from c where c.matchId = {matchId}",
  connection: "MyAccount_COSMOSDB",
});

const cosmosOutput = output.cosmosDB({
  databaseName: "householdDb",
  containerName: "gamesContent",
  createIfNotExists: false,
  partitionKey: "/matchId",
  connection: "MyAccount_COSMOSDB",
});

/*
Joining a match means getting your name in and storing
your metadata
*/

app.http("matchJoin", {
  methods: ["POST"],
  authLevel: "anonymous",
  extraInputs: [cosmosInput],
  extraOutputs: [cosmosOutput],
  route: "match/{matchId}/players",
  handler: async (request, context) => {
    const { playerName } = await request.json();
    const matchDocs = context.extraInputs.get(cosmosInput);

    const matchDoc = matchDocs.find((d) => id.includes("-doc"));
    const secretsDoc = matchDocs.find((d) => id.includes("-secrets"));

    const playerId = uuidv4();
    const playerSecret = uuidv4();

    matchDoc.playerIds.push(playerId);

    if (matchDoc.playerIds.length > matchDoc.playerCountMax) {
      return {
        body: JSON.stringify({}),
        status: 400,
      };
    }

    const playerDoc = {
      id: playerId,
      matchId,
      name: playerName,
    };

    secretsDoc.playerSecrets.playerId = playerSecret;

    const outputs = [matchDoc, playerDoc, secretsDoc];

    const response = {
      body: JSON.stringify({ matchDoc, playerDoc }),
      cookies: [
        {
          name: "playerSecret",
          value: playerSecret,
          maxAge: 60 * 10,
          httpOnly: true,
          path: "/",
        },
      ],
    };

    context.extraOutputs.set(cosmosOutput, outputs);

    return response;
  },
});
