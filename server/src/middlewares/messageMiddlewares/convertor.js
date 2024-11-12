const convertIdToObjectId = require('../../utils/convertToObjectId');

class Convertor {
    create = (req, res, next) => {
        try {
            req.body.chatId = convertIdToObjectId(req.body.chatId);
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    get = (req, res, next) => {
        try {
            req.query.chatId = convertIdToObjectId(req.query.chatId);
            req.query.limit = parseInt(req.query.limit);
            req.query.start = parseInt(req.query.start);
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new Convertor();
