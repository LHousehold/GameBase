module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const {
        playerName,
        connectionId
    } = req.body;

    const playerSecret = context.bindingData.sys.randGuid;

    // verify request
    if(playerName === undefined || connectionId === undefined) {
        context.res = {
            status: 400,
            body: {message: 'Incorrect input.'}
        };
        return;
    }

    const gameDoc = {...context.bindings.inputDocument};
    const secretsDoc = {...context.bindings.secretsDocument};

    if(gameDoc.mode !== 'joining') {
        context.res = {
            status: 400,
            body: {message: 'Game has already started.'}
        };
        return;
    }

    if(gameDoc.players.find(p => p.name === playerName)) {
        context.res = {
            status: 409,
            body: {message: 'Player name is taken.'}
        };
        return;
    }

    gameDoc.players.push({
        name: playerName
    });

    secretsDoc.playerSecrets.push(playerSecret);

    context.bindings.outputDocument = [
        gameDoc,
        secretsDoc
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { playerSecret }
    };
}