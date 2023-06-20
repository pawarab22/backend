const Joi = require('joi');

const authOrderSchema = Joi.object().keys({
    name: Joi.string().lowercase().required(),
    email: Joi.string().email().required(),
    mobileno:Joi.number().required(),
    address:Joi.string().lowercase().required(),
    pincode:Joi.string().required(),
    city:Joi.number().required(),
})

module.exports = {
    authOrderSchema,
}