
import { matchState, playerState } from './matchState.svelte.js';

const subscribeToMatch = async (playerId, matchId) => {
	try {
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
	} catch (err) {
		console.error(err);
	}

}

export { subscribeToMatch };
