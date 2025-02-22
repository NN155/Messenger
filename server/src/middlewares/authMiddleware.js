const Session = require('../models/Session');
const cookie = require('../utils/cookie');

const authMiddleware = async (req, res, next) => {

    const token = cookie.getCookie(req);

    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'No token provided or invalid token format' });
    }

    try {
        const session = await Session.findOne({ token });
        if (!session) {
            return res.status(401).json({ message: 'Invalid session' });
        }
        cookie.createCookie(res, token);
        session.updateSession();  
        req.userId = session.userId;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

module.exports = authMiddleware;