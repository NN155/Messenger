const Chat = require('../../../models/Chat');

const validatePersonal = async (data) => {
    const { members } = data;
    if (members.length !== 2) {
        throw new Error('Personal chat must have exactly two members.');
    }
    if (await Chat.findOne({ members: { $all: members } })) {
        throw new Error('Personal chat between these users already exists.');
    }
}

module.exports = validatePersonal;