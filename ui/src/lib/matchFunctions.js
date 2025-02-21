import { connect, live } from '$lib/live.js';

const createMatch = async (playerName) => {
	const apiResp = await fetch('/api/match', {
		method: 'POST',
		body: JSON.stringify({ playerName })
	});

	const createResponse = await apiResp.json();

	const { playerId, matchId } = createResponse;

	window.localStorage.setItem('playerId', playerId);
	window.localStorage.setItem('matchId', matchId);

	// connect(playerId, matchId);
	// connect live to data
	live(playerId, matchId);
};

const joinMatch = async (playerName, matchId) => {
	const apiResp = await fetch(`/api/match/${matchId}/players`, {
		method: 'POST',
		body: JSON.stringify({ playerName })
	});

	const joinResponse = await apiResp.json();

	const playerId = joinResponse.playerDoc.id;

	window.localStorage.setItem('playerId', playerId);
	window.localStorage.setItem('matchId', matchId);

	connect(playerId, matchId);
};

const rejoinMatch = async (matchId) => {
	const playerId = window.localStorage.getItem('playerId');

	await fetch(`/api/match/${matchId}/players/${playerId}`, {
		method: 'GET'
	});

	// don't need to set localstorage because should already exist

	// check status code before joining

	connect(playerId, matchId);
};

export { createMatch, joinMatch, rejoinMatch };
