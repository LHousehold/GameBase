<script>
	import { onMount } from 'svelte';
	import { HubConnectionBuilder } from "@microsoft/signalr";
	
	let playerName;
	let gameId;

	let gameDoc;

	let playerSecret;

	let connection;

	console.log('Refreshing...');

	const connect = async () => {
		console.log('Connecting...');

		const newConnection = await new HubConnectionBuilder()
    .withUrl("/api")
    .build();

		await newConnection.start();

		return newConnection;
	};

	onMount( async () => {
		connection = await connect();

		console.log(connection);
	});

	const createGame = async () => {
		const { connectionId } = connection;

		const resp = await fetch('/api/createGame', {
			method: 'POST',
			body: JSON.stringify({
				connectionId,
				playerName
			})
		});

		console.log(`Create game response: ${resp.status}`);

		const json = await resp.json();

		console.log(json);
		
		playerSecret = json.playerSecret;
		gameId = json.game;

		joinGameStream();
	};

	const joinGame = async () => {
		const { connectionId } = connection;

		const resp = await fetch(`/api/joinGame/${gameId}`, {
			method: 'POST',
			body: JSON.stringify({
				connectionId,
				playerName
			})
		});

		console.log(`Join game response: ${resp.status}`);

		const json = await resp.json();

		console.log(json);
	};

	const joinGameStream = async () => {
		const { connectionId } = connection;

		const resp = await fetch(`/api/joinGameStream/${gameId}`, {
			method: 'POST',
			body: JSON.stringify({
				connectionId,
				playerSecret
			})
		});

		console.log(`Join game stream response: ${resp.status}`);
	};
</script>

<main>
	<div>
		<input bind:value={playerName} />
		<button on:click={createGame}>Create game</button>
	</div>
	<br />
	<div>
		<input bind:value={playerName} />
		<input bind:value={gameId} />
		<button on:click={joinGame}>Join Game</button>
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
