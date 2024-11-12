// Desc: Message validation middlewares
const Joi = require('joi');
const validationMiddleware = require('../../utils/validation'); 

const createSchema = Joi.object({
    chatId: Joi.string().required(),
    text: Joi.string().required(),
});

const getSchema = Joi.object({
    chatId: Joi.string().required(),
    limit: Joi.number().integer().min(1).required(),
    start: Joi.number().integer().min(0).required(),
});

const create = validationMiddleware.body(createSchema);
const get = validationMiddleware.query(getSchema);

module.exports = { 
    create,
    get
 };