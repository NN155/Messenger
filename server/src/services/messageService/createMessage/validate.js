const User = require('../../../models/User');
const Chat = require('../../../models/Chat');

const validate = async (data) => {
    const { text } = data;
    if (text.length > 1000) {
        throw new Error('Message must be less than 1000 characters long.');
    }

    if (text.length < 1) {
        throw new Error('Message must have at least one character.');
    }
    
}
module.exports = validate;