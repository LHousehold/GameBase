import { HubConnectionBuilder } from '@microsoft/signalr';
import { Surreal } from "surrealdb";

const connect = async (playerId, matchId) => {
	const newConnection = new HubConnectionBuilder()
		.withUrl(`/api?playerId=${playerId}&matchId=${matchId}`)
		.withAutomaticReconnect()
		.build();

	await newConnection.start();

	return newConnection;
};

const updateMatch = (result) => {
	// somehow need to enforce security; can't subscribe to someone else's results
};

const live = async (playerId, matchId) => {
	const db = new Surreal();
	await db.connect("wss://householddb-06aiihsivpr4b71h3h9obqd06o.aws-use1.surreal.cloud", {
		namespace: "games",
		database: "games",
		auth: {
		  username: "azure",
		  password: "azure123pass!",
		}
	});

	const queryUuid = await db.live(
		"match",
		( action, result ) => {
			// action can be: 'CREATE', 'UPDATE', 'DELETE' or 'CLOSE'
			if (action === 'CLOSE') return;
	
			// result contains either the entire record, or a set of JSON patches when diff mode is enabled
			console.log(result);
			// updateMatch(result);
		}
	);

	console.log(queryUuid);
}

export { connect, live };
