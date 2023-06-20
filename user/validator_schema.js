const Joi = require('joi');

const authSchema = Joi.object().keys({
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
})

module.exports = {
    authSchema,
}