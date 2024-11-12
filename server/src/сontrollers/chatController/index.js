const ChatService = require('../../services/chatService');

class ChatController {
    async createChat(req, res) {
        const { members, isGroup, name } = req.body;
        const ownerId = req.userId;

        try {
            const chat = await ChatService.createChat({ members, isGroup, name, ownerId });
            return res.status(201).json(chat);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ChatController();