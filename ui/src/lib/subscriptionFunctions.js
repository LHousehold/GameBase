
import { db } from './surrealdb.js';
import { matchState, playerState } from './matchState.svelte.js';

const subscribeToMatch = async (playerId, matchId) => {
	const matchQueryUuid = await db.query(
		`LIVE SELECT * FROM match WHERE record::id(id)="${matchId}"`
	);

	await db.subscribeLive(matchQueryUuid,
		(action, result) => {
			matchState.value = result;
		});

	const playerQueryUuid = await db.query(
		`LIVE SELECT * FROM player WHERE record::id(id)="${playerId}"`
	);

	await db.subscribeLive(playerQueryUuid,
		(action, result) => {
			playerState.value = result;
		});

	const initMatchResult = await db.query(`SELECT * FROM match WHERE record::id(id)="${matchId}"`);

	matchState.value = initMatchResult.pop();

	const initPlayerResult = await db.query(`SELECT * FROM player WHERE record::id(id)="${playerId}"`);

	playerState.value = initPlayerResult.pop();

}

export { subscribeToMatch };
