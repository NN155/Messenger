const cookie = require('cookie');
const Session = require('../models/Session');

const socketAuthMiddleware = async (socket, next) => {
    const cookies = cookie.parse(socket.request.headers.cookie || '');
    const token = cookies['token'];

    if (!token) {
        socket.emit('error', { message: 'Authentication Error: No token provided' });
        return socket.disconnect();
    }

    try {
        const session = await Session.findOne({ token });

        if (!session) {
            return socket.emit('error', { message: 'Authentication Error: Invalid token' });
        }

        session.updateSession();  

        socket.userId = session.userId;
        next();
    } catch (err) {
        socket.emit('error', { message: `Authentication Error: ${err.message}` });
        return socket.disconnect();
    }
};

module.exports = socketAuthMiddleware;
