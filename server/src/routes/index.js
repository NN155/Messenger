const express = require('express');
const path = require('path');
const router = express.Router();
const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/api/messages', authMiddleware, messageRoutes);
router.use('/api/chats', authMiddleware, chatRoutes);
router.use('/api/users', userRoutes);
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'));
});

module.exports = router;