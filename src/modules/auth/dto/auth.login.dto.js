const Joi = require("joi");

const LoginDto = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { LoginDto };
