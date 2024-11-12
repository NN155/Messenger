const Message = require('../../../models/Message');
const validateAccess = require('../validateAccess');

const getMessages = async (data) => {
    validateAccess(data);
    const { chatId, start, limit } = data;
    try {
        const messages = await Message.find({ chatId })
            .sort({ createdAt: -1 })
            .skip(start)
            .limit(limit)
            .exec();
        return messages;
    } catch (error) {
        throw new Error(`Error while retrieving messages: ${error.message}`);
    }
};

module.exports = getMessages;