const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: function() { return this.isGroup; }
  },
  members: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],
  name: {
    type: String,
    required: function() { return this.isGroup; } 
  },
  isGroup: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
  messageCount: {
    type: Number,
    default: 0
  }
});

chatSchema.pre('save', function(next) {
  if (!this.isGroup && this.members.length !== 2) {
    return next(new Error('Non-group chat must have exactly two members.'));
  }

  if (this.isGroup && !this.members.includes(this.ownerId)) {
    return next(new Error('Owner must be a member of the group chat.'));
  }

  const uniqueMembers = new Set(this.members);
  if (uniqueMembers.size !== this.members.length) {
    return next(new Error('Members must be unique.'));
  }
  
  next();
});

chatSchema.methods.incrementMessageCount = async function() {
  this.messageCount += 1;
  await this.save();
};

chatSchema.methods.decrementMessageCount = async function() {
  if (this.messageCount > 0) {
    this.messageCount -= 1;
    await this.save();
  }
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;