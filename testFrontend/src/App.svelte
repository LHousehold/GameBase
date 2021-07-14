<script>
	import { onMount } from 'svelte';
	import { HubConnectionBuilder } from "@microsoft/signalr";
	
	let playerName;
	let gameId;

	let gameDoc;

	let playerSecret;

	console.log('Refreshing...');

	const connect = async () => {
		console.log('Connecting...');

		const newConnection = await new HubConnectionBuilder()
    .withUrl("http://172.31.107.127:7071/api")
    .build();

		await newConnection.start();

		return newConnection;
	};

	onMount( async () => {
		console.log('On mount...');

		const connection = connect();

		console.log(connection);
	});
</script>

<main>
	<div>
		<input bind:value={playerName} />
		<button>Create game</button>
	</div>
	<br />
	<div>
		<input bind:value={playerName} />
		<input bind:value={gameId} />
		<button>Join Game</button>
	</div>

	<div>
		{JSON.stringify(gameDoc)}
		<br />
		Secret: {playerSecret}
	</div>
</main>

<style>
	div {
		font-weight: bold;
	}
</style>
