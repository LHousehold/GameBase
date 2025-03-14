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

	const { playerId, matchCode, playerSecret } = createResponse;

	window.localStorage.setItem('playerId', playerId);
	window.localStorage.setItem('matchCode', matchCode);
	window.localStorage.setItem('secret', playerSecret);

	await signIn(playerId, playerSecret);

	await subscribeToMatch(playerId, matchCode);
};

const joinMatch = async (playerName, matchCode) => {
	const apiResp = await fetch(`/api/match/${matchCode}/players`, {
		method: 'POST',
		body: JSON.stringify({ playerName })
	});

	const joinResponse = await apiResp.json();

	const { playerId, playerSecret } = joinResponse;

	window.localStorage.setItem('playerId', playerId);
	window.localStorage.setItem('matchCode', matchCode);
	window.localStorage.setItem('secret', playerSecret);

	signIn(playerId, playerSecret);

	subscribeToMatch(playerId, matchCode);
};

const rejoinMatch = async (matchId) => { //replace with match code
	const playerId = window.localStorage.getItem('playerId');

	await fetch(`/api/match/${matchId}/players/${playerId}`, {
		method: 'GET'
	});

	// to populate later
};

export { createMatch, joinMatch, rejoinMatch };
