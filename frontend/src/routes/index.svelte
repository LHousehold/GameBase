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
		.withAutomaticReconnect()
    .build();

		await newConnection.start();

		return newConnection;
	};

	onMount( async () => {
		connection = await connect();

		connection.on('newMessage', (message) => {
			gameDoc = message;
		});

		if(window.localStorage.getItem('playerSecret') && window.localStorage.getItem('gameId')) {
			playerSecret = window.localStorage.getItem('playerSecret');
			gameId = window.localStorage.getItem('gameId');

			console.log(`Automatically joining: ${gameId} as ${playerSecret}`);

			const resp = await joinGameStream();

			gameDoc = resp.gameDoc;
			playerName = resp.playerName;
		}
	});

	const createGame = async () => {
		let { connectionId } = connection;

		if(!connectionId) {
			connection = connect();
			connectionId = connection.connectionId;
		}

		const resp = await fetch('/api/createGame', {
			method: 'POST',
			body: JSON.stringify({
				connectionId,
				playerName
			})
		});

		console.log(`Create game response: ${resp.status}`);

		const json = await resp.json();

		playerSecret = json.playerSecret;

		if(resp.status === 201) {
			const resp = await joinGameStream();
			gameDoc = resp.gameDoc;
			gameId = gameDoc.game;
		}

		window.localStorage.setItem('playerSecret', playerSecret);
		window.localStorage.setItem('gameId', gameId);
	};

	const joinGame = async () => {
		let { connectionId } = connection;

		if(!connectionId) {
			connection = connect();
			connectionId = connection.connectionId;
		}

		const resp = await fetch(`/api/joinGame/${gameId}`, {
			method: 'POST',
			body: JSON.stringify({
				connectionId,
				playerName
			})
		});

		console.log(`Join game response: ${resp.status}`);

		const json = await resp.json();
		playerSecret = json.playerSecret;

		if(resp.status === 200) {
			const resp = await joinGameStream();
			gameDoc = resp.gameDoc;
		}

		window.localStorage.setItem('playerSecret', playerSecret);
		window.localStorage.setItem('gameId', gameId);
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

		const json = await resp.json();

		console.log(`Join game stream response: ${resp.status}`);
		console.log(json);

		return json;
	};

	const quitGame = async () => {
		window.localStorage.setItem('gameId', '');
		window.localStorage.setItem('playerSecret', '');
		gameId = '';
		playerSecret = '';
		connection.stop();
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
		<button on:click={quitGame}>Quit Game</button>
	</div>

	<div>
		Players:
		{#each gameDoc ? gameDoc.players : [] as player}
			<p>{player.name}</p>
		{/each}
	</div>
</main>

<style>
	div {
		font-weight: bold;
	}
</style>
