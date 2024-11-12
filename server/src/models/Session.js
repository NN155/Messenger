const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, unique: true },
    lastActive: { type: Date, default: Date.now },
    expiresAt: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        },
    }
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

//Автопродовження токену
sessionSchema.methods.updateSession = function () {
    this.lastActive = Date.now();
    this.expiresAt = new Date(this.lastActive);
    this.expiresAt.setMonth(this.expiresAt.getMonth() + 1);
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
