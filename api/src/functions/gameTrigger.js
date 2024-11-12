const { app, output } = require('@azure/functions');

const signalROutput = output.generic({
    type: 'signalR',
    hubName: 'gameHub',
    connection: 'Games_SIGNALR',
    connectionStringSetting: 'Games_SIGNALR',
});

app.cosmosDB('gameTrigger', {
    connection: 'MyAccount_COSMOSDB',
    databaseName: 'householdDb',
    containerName: 'gameContent',
    extraOutputs: [signalROutput],
    handler: (documents, context) => {
        const messages = [];

        for (let docIndex in documents) {
            const doc = documents[docIndex];
            console.log("Document updated.");
            console.log(doc);
            if(!doc.playerId) {
                continue;
            }
            console.log("Sending to user " + doc.playerId);
            if(doc.playerId) {
                messages.push({
                    "target": "newMessage",
                    "userId": doc.playerId,
                    "arguments": [doc]
                });
            }
        }

        context.extraOutputs.set(signalROutput, messages);
    }
});
