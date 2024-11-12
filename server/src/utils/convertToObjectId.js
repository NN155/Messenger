const mongoose = require('mongoose');

const convertToObjectId = (id) => {
    if (typeof id === 'string') {
        return new mongoose.Types.ObjectId(id);
    }
    throw new Error('ID must be a string.');
};

module.exports = convertToObjectId;