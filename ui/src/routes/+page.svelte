<script>
	import { createMatch, joinMatch, rejoinMatch } from '$lib/matchFunctions.js';

	let playerName = $state('');
	let matchId = $state('');

	let match = $state('');

	// probably want to make a store for matchId
	if (typeof window !== 'undefined') {
		// use svelte environment instead
		match = window.localStorage.getItem('matchId');
	}
</script>

<input type="text" placeholder="Player Name" bind:value={playerName} />

<button onclick={() => createMatch(playerName)}>Create</button>

<input type="text" placeholder="Match ID" bind:value={matchId} />

<button onclick={() => joinMatch(playerName)}>Join</button>

<button onclick={() => rejoinMatch(matchId)}>Rejoin</button>

<p>{match}</p>
