<script>
	import { matchState, playerState } from '$lib/matchState.svelte.js';
	import { createMatch, joinMatch, rejoinMatch } from '$lib/matchFunctions.js';

	let playerName = $state('');
	let matchIdState = $state('');

	let match = $state('');

	// probably want to make a store for matchId
	if (typeof window !== 'undefined') {
		// use svelte environment instead
		match = window.localStorage.getItem('matchId');
	}
</script>

<input type="text" placeholder="Player Name" bind:value={playerName} />

<button onclick={() => createMatch(playerName)}>Create</button>

<input type="text" placeholder="Match ID" bind:value={matchIdState} />

<button onclick={() => joinMatch(playerName, matchIdState)}>Join</button>

<button onclick={() => rejoinMatch(matchIdState)}>Rejoin</button>

<p>{JSON.stringify(matchState.value)}</p>
