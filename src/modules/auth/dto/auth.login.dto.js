const Joi = require("joi");

const LoginDto = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { LoginDto };
