import { app } from "@azure/functions";
import { v4 as uuidv4 } from "uuid";
import { Surreal, RecordId } from "surrealdb";

app.http("matchJoin", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "match/{matchId}/players",
  handler: async (request, context) => {
    const { playerName } = await request.json();
    const { matchId } = request.params;

    const db = new Surreal();

    await db.connect("wss://householddb-06aiihsivpr4b71h3h9obqd06o.aws-use1.surreal.cloud", {
      namespace: "games",
      database: "games",
      auth: {
        username: "azure",
        password: "azure123pass!",
      }
    });

    const playerId = uuidv4();
    const playerSecret = uuidv4();

    const playerRecordId = new RecordId('player', playerId);
    const matchRecordId = new RecordId('match', matchId);

    const match = await db.select(new RecordId('match', matchId))
    // confirm match does exist before attempting to join

    await db.patch(matchRecordId, [
      { op: 'add', path: '/playersIds', value: playerRecordId },
    ]);

    await db.create(playerRecordId, {
      matchId: matchRecordId,
      name: playerName,
      playerSecret
    });

    await db.close();

    const response = {
      body: JSON.stringify({
        matchId,
        playerId,
        playerSecret
      }),
      // cookies: [
      //   {
      //     name: "playerSecret",
      //     value: playerSecret,
      //     maxAge: 60 * 10,
      //     httpOnly: true,
      //     path: "/",
      //   },
      // ],
    };

    return response;
  },
});
