const Message = require('../../../models/Message');
const Chat = require('../../../models/Chat');
const validate = require('./validate');
const validateAccess = require('../validateAccess');

const createMessage = async (data) => {
  await validate(data);
  await validateAccess({...data, userId: data.senderId});
  const { chatId, senderId, text } = data;
  try {
    const chat = await Chat.findById(chatId);
    const message = await Message.create({ chatId, senderId, text });
    chat.incrementMessageCount();
    return message;
  } catch (error) {
    throw new Error('Failed to create message: ' + error.message);
  };
};

module.exports = createMessage

