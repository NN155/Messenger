const convertIdToObjectId = require('../../utils/convertToObjectId');

class Convertor {
    create = (req, res, next) => {
        try {
            req.body.members = req.body.members.map(member => convertIdToObjectId(member));
            if (req.body.members.includes(req.userId)) {
                req.body.members.push(req.userId);
            }
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
module.exports = new Convertor();
