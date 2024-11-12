const Session = require('../../../models/Session');

const deleteSession = async (token) => {
    try {
        if (!token) {
            throw new Error('Token is required');
        }
        const session = await Session.findOneAndDelete({ token: token });
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    } catch (error) {
        throw new Error('Failed to delete session: ' + error.message);
    }
};

module.exports = deleteSession;
