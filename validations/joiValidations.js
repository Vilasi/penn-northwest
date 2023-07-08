//! -- Joi Data Validations
const Joi = require('joi');
// console.log(Joi);

module.exports.registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(2).required(),
  company: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
