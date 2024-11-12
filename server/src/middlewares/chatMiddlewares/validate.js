// Desc: Chat validation middlewares
const Joi = require('joi');
const validationMiddleware = require('../../utils/validation'); 


const createSchema = Joi.object({
  isGroup: Joi.boolean().required(),
  name: Joi.when('isGroup', { is: true, then: Joi.string().required() }),
  members: Joi.array().items(Joi.string()).required(),
});



const create = validationMiddleware.body(createSchema);

module.exports = { 
  create, 
};

