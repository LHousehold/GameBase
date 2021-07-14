module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const {
        playerName,
        connectionId
    } = req.body;

    // verify request
    if(playerName === undefined || connectionId === undefined) {
        context.res = {
            status: 400,
            body: {message: 'Invalid input.'}
        };
        return;
    }

    // we're gonna create a game here
    const gameId = context.bindingData.sys.randGuid;
    const playerSecret = context.bindingData.sys.randGuid;

    const gameDoc = {
        id: `${gameId}-game`,
        game: gameId,
        mode: 'joining',
        players: [
            {
                name: playerName
            }
        ],
        owner: 0
    };

    const secretsDoc = {
        id: `${gameId}-secrets`,
        game: gameId,
        playerSecrets: [
            playerSecret
        ]
    };

    context.bindings.outputDocument = [
        gameDoc,
        secretsDoc
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { ...gameDoc, playerSecret }
    };
}