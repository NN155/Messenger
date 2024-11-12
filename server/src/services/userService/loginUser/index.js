const User = require('../../../models/User');

const loginUser = async (data) => {

    const { loginOrEmail, password } = data;

    try {
        const user = await User.findOne({
            $or: [
                { login: loginOrEmail },
                { email: loginOrEmail }
            ]
        });

        if (!user) {
            throw new Error('Wrong login or password');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new Error('Wrong login or password');
        } else {
            return user;
        }
    } catch (error) {
        throw new Error('Failed to login user: ' + error.message);
    }
};

module.exports = loginUser;