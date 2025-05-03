const User = require('../../../models/User');

class UserValidator {
    constructor() {
        this.errors = {};
    }

    addError(field, message) {
        if (!this.errors[field]) {
            this.errors[field] = message;
        }
    }

    getErrors() {
        return this.errors;
    }

    validateRequiredFields(data) {
        const { username, password, email } = data;
        if (!username) this.addError('username', 'Username is required');
        if (!password) this.addError('password', 'Password is required');
        if (!email) this.addError('email', 'Email is required');
    }

    validateUsernameLength(data) {
        const { username } = data;
        if (username.length < 3 || username.length > 32) {
            this.addError('username', 'Username must be between 3 and 32 characters long');
        }
    }

    validatePasswordLength(data) {
        const { password } = data;
        if (password.length < 6) {
            this.addError('password', 'Password must be at least 6 characters long');
        }
        else if (password.length > 72) {
            this.addError('password', 'Password must be at most 72 characters long');
        }
    }

    validateNicknameLength(data) {
        const { nickname } = data;
        if (nickname && nickname.length > 32) {
            this.addError('nickname', 'Nickname must be at most 32 characters long');
        }
    }

    validateEmailFormat(data) {
        const { email } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.addError('email', 'Invalid email format');
        }
    }

    async validateUniqueEmail(data) {
        const { email } = data;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            this.addError('email', 'Email already in use');
        }
    }

    async validateUniqueUsername(data) {
        const { username } = data;
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            this.addError('username', 'Username already in use');
        }
    }

    async validate(data) {
        this.validateRequiredFields(data);
        if (Object.keys(this.errors).length > 0) {
            return {
                success: false,
                errors: this.errors,
                status: 400,
            };
        }

        this.validateUsernameLength(data);
        this.validatePasswordLength(data);
        this.validateNicknameLength(data);
        this.validateEmailFormat(data);

        if (Object.keys(this.errors).length > 0) {
            return {
                success: false,
                errors: this.errors,
                status: 400,
            };
        }
        await Promise.all([
            this.validateUniqueEmail(data),
            this.validateUniqueUsername(data)
        ]);

        if (Object.keys(this.errors).length > 0) {
            return {
                success: false,
                errors: this.errors,
                status: 409,
            };
        }

        return {
            success: true,
            errors: {},
            status: 200,
        };
    }

}

module.exports = UserValidator;
