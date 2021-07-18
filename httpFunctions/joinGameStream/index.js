module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const {
        playerSecret,
        connectionId
    } = req.body;

    // verify request
    if(playerSecret === undefined || connectionId === undefined) {
        context.res = {
            status: 400,
            body: {message: 'Invalid input.'}
        };
        return;
    }

    const gameDoc = {...context.bindings.inputDocument};
    const secretsDoc = {...context.bindings.secretsDocument};

    const playerSecrets = secretsDoc.playerSecrets;

    if(!playerSecrets.includes(playerSecret)) {
        context.res = {
            status: 406,
            body: {message: 'Player must have joined game to join stream.'}
        };
        return;
    }

    const playerIndex = playerSecrets.indexOf(playerSecret);
    const playerName = gameDoc.players[playerIndex].name;

    // assuming everything is successful so far, we are going to add the new player to the game
    context.bindings.signalRGroupActions = [{
        connectionId: connectionId,
        groupName: gameDoc.game,
        action: "add"
    }];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { gameDoc, playerSecret, playerName}
    };
}