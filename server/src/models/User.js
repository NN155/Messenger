const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  avatar: { type: String },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Hashing the password before saving the user to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

// Comparing the password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
