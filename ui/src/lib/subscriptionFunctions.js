
import { db } from './surrealdb.js';
import { matchState, playerState } from './matchState.svelte.js';

const subscribeToMatch = async (playerId, matchCode) => {
	const matchQueryUuid = await db.query(
		`LIVE SELECT * FROM match WHERE matchCode="${matchCode}"`
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

	const queryString = `SELECT * FROM match WHERE matchCode="${matchCode}";`;

	console.log(1, queryString);

	const initMatchResult = await db.query(queryString);

	// const initMatchResult = await db.query(
	// 	'SELECT * FROM match WHERE matchCode="$mc"',
	// 	{ 'mc': matchCode }
	// );
	console.log(1, matchCode);
	console.log(2, initMatchResult);

	matchState.value = initMatchResult[0][0]; //TODO add error handling


	const initPlayerResult = await db.query(`SELECT * FROM player WHERE record::id(id)="${playerId}"`);

	playerState.value = initPlayerResult[0][0]; //TODO add error handling

}

export { subscribeToMatch };
