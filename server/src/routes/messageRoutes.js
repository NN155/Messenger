const express = require('express');
const router = express.Router();
const messageController = require('../сontrollers/messageController');
const { validate, convertor } = require('../middlewares/messageMiddlewares');

router.post('/send', validate.create, convertor.create, messageController.createMessage);

router.get('/get', validate.get, convertor.get, messageController.getMessages);

module.exports = router;
