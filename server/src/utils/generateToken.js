const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  const token = jwt.sign({ id: userId, iat: timestamp }, secretKey);
  return token;
};

module.exports = generateToken;