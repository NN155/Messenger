const User = require('../../../models/User');

const loginUser = async (data) => {

    const { usernameOrEmail, password } = data;

    try {
        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user) {
            throw new Error('Wrong username/email or password');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new Error('Wrong username/email or password');
        } else {
            return user;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = loginUser;