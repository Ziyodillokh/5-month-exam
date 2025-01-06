const Joi = require("joi");

const notificationCreateDto = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  isGlobal: Joi.boolean().required(),
  userId: Joi.string(),
});

module.exports = { notificationCreateDto };
