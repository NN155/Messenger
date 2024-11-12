const express = require('express');
const router = express.Router();
const UserController = require('../сontrollers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const {convertor, validate} = require('../middlewares/userMiddlewares');

router.post('/register', validate.create, convertor.create, UserController.createUser);
router.post('/login', validate.login, convertor.login, UserController.loginUser);
router.post('/logout', authMiddleware, UserController.logoutUser);
router.get('/get', validate.get, convertor.get, UserController.getUserById);
module.exports = router;
