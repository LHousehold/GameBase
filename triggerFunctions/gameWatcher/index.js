module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {
        context.log('Document Id: ', documents[0].id);
    }

    context.bindings.signalRMessages = [{
        // message will only be sent to this user ID
        "target": "newMessage",
        "arguments": [ documents[0] ]
    }];
}
