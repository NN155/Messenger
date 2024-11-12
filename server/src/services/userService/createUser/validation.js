const User = require('../../../models/User');

const validateUserData = async (data) => {
    const { login, password, email } = data;
    if (!login || !password || !email) {
        throw new Error('All fields are required');
    }

    if (login.length < 3 || login.length > 20) {
        throw new Error('Login must be between 3 and 20 characters long');
    }

    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new Error('Email already exists');
    }

    const existingLogin = await User.findOne({ login });
    if (existingLogin) {
        throw new Error('Login already exists');
    }
};

module.exports = validateUserData
