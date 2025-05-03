const User = require('../../../models/User');
const UserValidator = require('./validation');
const generateRandomNickname = require('../../../utils/generateRandomNickname');


const createUser = async (data) => {
    const userValidator = new UserValidator();
    const validateResponse = await userValidator.validate(data); 
    if (!validateResponse.success) {
        return validateResponse;
    }

    let { username, email, password, nickname } = data;
    
    nickname = nickname || generateRandomNickname();

    try {
        const user = await User.create({ username, email, password, nickname });
        return {
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                nickname: user.nickname
            },
            status: 201,
        };
    } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
    };
};

module.exports = createUser

