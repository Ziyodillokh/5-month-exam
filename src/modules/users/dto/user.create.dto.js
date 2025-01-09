const Joi = require("joi");

const userCreateDto = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("admin", "leader", "manager", "employee").required(),
});

module.exports = { userCreateDto };
