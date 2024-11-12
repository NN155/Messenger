const SocketManager = require('./SocketManager');
const Chat = require('../models/Chat');

class SocketDispatcher {
    notifyUser(event, data, userId) {
        const socketsId = SocketManager.getSocketsId(userId);
        if (!socketsId) return;
        socketsId.forEach(socketId => {
            SocketManager.io.to(socketId).emit(event, data);
        });
    }

    notifyUsers(event, data, userIds) {
        userIds.forEach(userId => {
            this.notifyUser(event, data, userId);
        });
    }

    async notifyUsersByChatId(event, data, chatId) {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) return;
            this.notifyUsers(event, data, chat.members);
        } catch (error) {
            console.log('SocketDispatcher.notifyUsersByChatId error: ', error.message);
        }
    }
}

module.exports = new SocketDispatcher()