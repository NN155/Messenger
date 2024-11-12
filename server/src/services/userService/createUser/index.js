const User = require('../../../models/User');
const validateUserData = require('./validation');
const generateRandomUserName = require('../../../utils/generateRandomUserName');


const createUser = async (data) => {
    
    await validateUserData(data); 

    const { login, email, password } = data;

    const userName = generateRandomUserName();
    try {
        const user = await User.create({ login, email, password, userName });
        return user;
    } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
    };
};

module.exports = createUser

