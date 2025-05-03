const UserService = require('../../services/userService');
const SessionService = require('../../services/sessionService');
const cookie = require('../../utils/cookie');

class UserController {
    async createUser(req, res) {
        const { username, email, password, nickname } = req.body;

        try {
            const response = await UserService.createUser({ username, email, password, nickname });
            
            if (!response.success) {
                return res.status(response.status).json({ 
                    success: false,
                    errors: response.errors 
                });
            } 
            
            const token = await SessionService.createSession(response.data.id);
            cookie.createCookie(res, token);
            
            return res.status(201).json({ 
                success: true,
                message: 'User created',
                user: response.data
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }
    }

    async loginUser(req, res) {
        const { usernameOrEmail, password } = req.body;
        try {
            const user = await UserService.loginUser({ usernameOrEmail, password });
            const token = await SessionService.createSession(user._id);
            cookie.createCookie(res, token);
            return res.status(204).send();
        } catch (error) {
            if (error.message === 'Wrong username/email or password') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    async logoutUser(req, res) {
        const token = cookie.getCookie(req);
        try {
            await SessionService.deleteSession(token);
            cookie.clearCookie(res);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const userId = req.query.userId;
        try {
            const user = await UserService.getUserById({ userId });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async auth(req, res) {
        try {
            if (!req.isAuthenticated) {
                return res.status(200).json({ isAuthenticated: false });
            }
            else {
                const user = await UserService.getUserById({ userId: req.userId });
                if (!user) {
                    return res.status(200).json({ isAuthenticated: false });
                }
                return res.status(200).json({ isAuthenticated: true, user });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async checkUsername(req, res) {
        const { username } = req.body;
        try {
            const isUsernameAvailable = await UserService.checkUsername({ username });
            return res.status(200).json({ isAvailable: isUsernameAvailable });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new UserController();