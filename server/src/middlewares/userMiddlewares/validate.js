// Desc: User validation middlewares
const Joi = require('joi');
const validationMiddleware = require('../../utils/validation'); 

const createSchema = Joi.object({
    email: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
});
  
const loginSchema = Joi.object({
    loginOrEmail: Joi.string().required(),
    password: Joi.string().required(),
});

const getUserByIdSchema = Joi.object({
    userId: Joi.string().required(),
});

const create = validationMiddleware.body(createSchema);
const login = validationMiddleware.body(loginSchema);
const get = validationMiddleware.query(getUserByIdSchema);

module.exports = { create, login, get };