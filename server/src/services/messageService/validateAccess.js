const User = require('../../models/User');
const Chat = require('../../models/Chat');

const validateAccess = async (data) => {
    const { chatId, userId } = data;
    const [user, chat] = await Promise.all([
        User.findById(userId),
        Chat.findById(chatId)
    ]);

    if (user === null) {
        throw new Error('User with this ID does not exist.');
    }
    if (chat === null) {
        throw new Error('Chat with this ID does not exist.');
    }

    if (!chat.members.includes(userId)) {
        throw new Error('User are not a participant of this chat.');
    }
    
}
module.exports = validateAccess;