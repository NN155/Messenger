const Session = require('../models/Session');
const cookie = require('../utils/cookie');

class AuthMiddlewareFactory {
    async _validateToken(token) {
        if (typeof token !== 'string') {
            return null;
        }
        try {
            return await Session.findOne({ token });
        } catch (error) {
            return null;
        }
    }

    _setupAuthenticatedUser(req, res, session, token) {
        cookie.createCookie(res, token);
        session.updateSession();
        req.userId = session.userId;
        req.isAuthenticated = true;
    }

    create(options = {}) {
        return async (req, res, next) => {
            req.isAuthenticated = false;
            const token = cookie.getCookie(req);
            try {
                const session = await this._validateToken(token);
                if (!session) {
                    if (token) cookie.clearCookie(res);

                    if (options.protectedRoute) {
                        return res.status(401).json({
                            message: token ? 'Invalid session' : 'Authentication required'
                        });
                    }
                    return next();
                }

                this._setupAuthenticatedUser(req, res, session, token);

                return next();
            } catch (err) {
                return res.status(500).json({
                    message: 'Authentication error',
                    error: err.message
                });
            }
        };
    }
}

const factory = new AuthMiddlewareFactory();

module.exports = {
    protected: factory.create({ protectedRoute: true }),
  
    default: factory.create(),
};