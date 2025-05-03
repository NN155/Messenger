// Desc: User validation middlewares
const Joi = require('joi');
const validationMiddleware = require('../../utils/validation'); 

const createSchema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    nickname: Joi.string().optional().allow(null, ''),
});
  
const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required(),
});

const getUserByIdSchema = Joi.object({
    userId: Joi.string().required(),
});

const checkUsernameSchema = Joi.object({
    username: Joi.string().required(),
});

const create = validationMiddleware.body(createSchema);
const login = validationMiddleware.body(loginSchema);
const get = validationMiddleware.query(getUserByIdSchema);
const checkUsername = validationMiddleware.body(checkUsernameSchema);

module.exports = { create, login, get, checkUsername };