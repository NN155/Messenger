const User = require('../../../models/User');

async function checkUsername ({ username }) {
    const user = await User.findOne({ username });
    return !user
}

module.exports = checkUsername;