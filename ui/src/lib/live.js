import { HubConnectionBuilder } from '@microsoft/signalr';

const connect = async (playerId, matchId) => {
	const newConnection = new HubConnectionBuilder()
		.withUrl(`/api?playerId=${playerId}&matchId=${matchId}`)
		.withAutomaticReconnect()
		.build();

	await newConnection.start();

	return newConnection;
};

export { connect };
