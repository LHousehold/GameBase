import { db } from './surrealdb';

const updateMatch = (result) => {
	// somehow need to enforce security; can't subscribe to someone else's results
};

const live = async (playerId, matchId) => {
	const queryUuid = await db.query(
		"LIVE SELECT * FROM match where playerCountMax < 3"
	);

	await db.subscribeLive(queryUuid,
		(action, result) => {
			// action can be: 'CREATE', 'UPDATE', 'DELETE' or 'CLOSE'
			if (action === 'CLOSE') return;

			// result contains either the entire record, or a set of JSON patches when diff mode is enabled
			console.log(result);
			// updateMatch(result);
		});
}

export { live };
