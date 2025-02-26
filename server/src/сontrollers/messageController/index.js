const messageService = require('../../services/messageService');
const eventEmitter = require('../../observers/eventEmitter');

class MessageController {
    async createMessage(req, res) {
        const { chatId, text } = req.body;
        const senderId = req.userId;
        try {
            const message = await messageService.createMessage({ chatId, senderId, text });
            eventEmitter.emit('message', {
                action: 'create',
                payload: message
            });
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMessages(req, res) {
        const { chatId, start, limit } = req.query;
        const userId = req.userId;
        try {
            const messages = await messageService.getMessages({ chatId, userId, start, limit });
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MessageController();