<script>
	import { matchState, playerState } from '$lib/matchState.svelte.js';
	import { createMatch, joinMatch, rejoinMatch } from '$lib/matchFunctions.js';

	let playerNameInput = $state('');
	let matchCodeInput = $state('');

	console.log('matchState', matchState);
	console.log('matchStatevalue', matchState.value);
</script>

<input type="text" placeholder="Player Name" bind:value={playerNameInput} />

<button onclick={() => createMatch(playerNameInput)}>Create</button>

<input type="text" placeholder="Match Code" bind:value={matchCodeInput} />

<button onclick={() => joinMatch(playerNameInput, matchCodeInput)}>Join</button>

<!-- <button onclick={() => rejoinMatch(matchIdState)}>Rejoin</button> -->

{#if matchState.value?.status && matchState.value.status === 'pending'}
	<p>Participating in match {matchState.value.matchCode}</p>
	<!-- <p>With players: {JSON.stringify(matchState.value)}</p> -->
	<p>Status: {matchState.value.status}</p>
{/if}