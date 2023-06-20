const Joi = require('joi');

const authProdSchema = Joi.object().keys({
    productname: Joi.string().lowercase().required(),
    productImg: Joi.string().required(),
    price:Joi.number().required(),
    quantity:Joi.number().required(),
    description:Joi.string().lowercase().required(),
    total:Joi.number().required(),
})

module.exports = {
    authProdSchema,
}