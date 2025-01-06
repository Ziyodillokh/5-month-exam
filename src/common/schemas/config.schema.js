const Joi = require("joi");

const configSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URL: Joi.string().required(),
  JWT_ACC_SECRET: Joi.string().required(),
  JWT_REF_SECRET: Joi.string().required(),
  JWT_ACC_TIME: Joi.number().required(),
  JWT_REF_TIME: Joi.number().required(),
});

module.exports = { configSchema };
