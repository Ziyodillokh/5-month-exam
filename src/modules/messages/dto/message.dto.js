const Joi = require("joi");

const messageCreateDto = Joi.object({
  message: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  isRead: Joi.boolean().required(),
});

module.exports = { messageCreateDto };