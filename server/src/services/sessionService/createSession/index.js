const Session = require('../../../models/Session');
const generateToken = require('../../../utils/generateToken');

const createSession = async (userId) => {
  const token = generateToken(userId);
  try {
    await Session.create({
      userId: userId,
      token: token,
    });
    return token;
  }
  catch (error) {
    throw new Error('Failed to create session: ' + error.message);
  };
};

module.exports = createSession;
