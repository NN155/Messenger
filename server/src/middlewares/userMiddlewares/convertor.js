const convertToObjectId = require('../../utils/convertToObjectId');

class Convertor {
    __trimAndLowerCase = (value) => {
        return value.trim().toLowerCase();
    }

    create = (req, res, next) => {
        try {
            req.body.email = this.__trimAndLowerCase(req.body.email);
            req.body.login = this.__trimAndLowerCase(req.body.login);
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    login = (req, res, next) => {
        try {
            req.body.loginOrEmail = this.__trimAndLowerCase(req.body.loginOrEmail);
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    get = (req, res, next) => {
        try {
            req.query.userId = convertToObjectId(req.query.userId);
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new Convertor();
