import { app } from "@azure/functions";
import { v4 as uuidv4 } from "uuid";
import { Surreal, RecordId } from "surrealdb";

// azure | azure123pass!

app.http("matchCreate", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "match",
  handler: async (request, context) => {
    const { playerName } = await request.json();

    if (!playerName) {
      return {
        status: 400,
        body: JSON.stringify({ message: "Player Name not provided" }),
      };
    }

    const playerId = uuidv4();
    const playerSecret = uuidv4();
    const matchId = uuidv4();

    const playerRecordId = new RecordId('player', playerId);
    const matchRecordId = new RecordId('match', matchId);
    const secretRecordId = new RecordId('secret', matchId);

    const db = new Surreal();

    await db.connect("wss://householddb-06aiihsivpr4b71h3h9obqd06o.aws-use1.surreal.cloud", {
      namespace: "games",
      database: "games",
      auth: {
        username: "azure",
        password: "azure123pass!",
      }
    });

    await db.create(matchRecordId, {
      status: "pending",
      ownerId: playerRecordId,
      playersIds: [playerRecordId],
      playerCountMax: 2,
    });

    await db.create(secretRecordId, {
      matchId: matchRecordId,
    });

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
