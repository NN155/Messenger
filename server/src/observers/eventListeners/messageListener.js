const eventEmitter = require('../eventEmitter');
const SocketDispatcher = require('../../socket/socketDispatcher');

class MessageListener {
    constructor() {
        eventEmitter.on('message', this.onMessage);
    }
    onMessage(data) {
        SocketDispatcher.notifyUsersByChatId("message", data, data.payload.chatId);
    }
}

module.exports = new MessageListener();