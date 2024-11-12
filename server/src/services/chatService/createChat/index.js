const Chat = require('../../../models/Chat');
const validateMembers  = require('./validateMembers');
const validatePersonal = require('./validatePersonal');
const validateGroup = require('./validateGroup');

const createChat = async (data) => {
    const { isGroup, members, name, ownerId } = data;
    await validateMembers(members);
    isGroup ? validateGroup(data) : await validatePersonal(data);

    newData = isGroup ? { isGroup, members, name, ownerId } : { isGroup, members };
    try {
        const newChat = new Chat({
            ...newData
        });

        await newChat.save();
        return newChat;
    } catch (error) {
        throw new Error('Error creating chat: ' + error.message);
    }
};

module.exports = createChat;
