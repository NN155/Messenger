const User = require('../../../models/User');

const loginUser = async (data) => {

    const { userId } = data;

    try {
        const user = await User.findById(userId).select('userName avatar');
        if (!user) {
            throw new Error('User not found');
        }
        const data = {userName: user.userName, avatar: user.avatar};
        return data;
    } catch (error) {
        throw new Error('Failed to get User: ' + error.message);
    }
};

module.exports = loginUser;