const express = require('express');
const router = express.Router();
const ChatController = require('../сontrollers/chatController');
const {convertor, validate} = require('../middlewares/chatMiddlewares');

router.post('/create', validate.create, convertor.create, ChatController.createChat);

module.exports = router;
