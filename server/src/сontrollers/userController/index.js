const UserService = require('../../services/userService');
const SessionService = require('../../services/sessionService');
const cookie = require('../../utils/cookie');

class UserController {
    async createUser(req, res) {
        const { login, email, password } = req.body;

        try {
            const user = await UserService.createUser({ login, email, password });
            const token = await SessionService.createSession(user._id);
            cookie.createCookie(res, token);
            return res.status(201).json({ message: 'User created' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        const { loginOrEmail, password } = req.body;
        try {
            const user = await UserService.loginUser({ loginOrEmail, password });
            const token = await SessionService.createSession(user._id);
            cookie.createCookie(res, token);
            return res.status(204).send();
        } catch (error) {
            if (error.message === 'Wrong login or password') {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: error.message });
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
            const user = await UserService.getUserById({userId});
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new UserController();