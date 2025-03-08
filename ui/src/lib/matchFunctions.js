import { subscribeToMatch } from './subscriptionFunctions.js';
import { db } from './surrealdb';

const signIn = async (playerId, playerSecret) => {
	const token = await db.signin({
		namespace: 'games',
		database: 'games',
		access: 'player',
	
		variables: {
			playerId,
			playerSecret
		},
	});

	console.debug("Received token: ", token);
	console.log("Signed in successfully.");
};

const createMatch = async (playerName) => {
	const apiResp = await fetch('/api/match', {
		method: 'POST',
		body: JSON.stringify({ playerName })
	});

	const createResponse = await apiResp.json();

	const { playerId, matchId, playerSecret } = createResponse;

	window.localStorage.setItem('playerId', playerId);
	window.localStorage.setItem('matchId', matchId);
	window.localStorage.setItem('secret', playerSecret);

	signIn(playerId, playerSecret);

	subscribeToMatch(playerId, matchId);
};

// const joinMatch = async () => {};
const joinMatch = async (playerName, matchId) => {
	const apiResp = await fetch(`/api/match/${matchId}/players`, {
		method: 'POST',
		body: JSON.stringify({ playerName })
	});

	const joinResponse = await apiResp.json();

	const { playerId, playerSecret } = joinResponse;

	window.localStorage.setItem('playerId', playerId);
	window.localStorage.setItem('matchId', matchId);
	window.localStorage.setItem('secret', playerSecret);

	signIn(playerId, playerSecret);

	subscribeToMatch(playerId, matchId);
};

const rejoinMatch = async (matchId) => {
	const playerId = window.localStorage.getItem('playerId');

	await fetch(`/api/match/${matchId}/players/${playerId}`, {
		method: 'GET'
	});

	// don't need to set localstorage because should already exist

	// check status code before joining

	// connect(playerId, matchId);
};

export { createMatch, joinMatch, rejoinMatch };
