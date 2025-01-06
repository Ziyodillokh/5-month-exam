const Joi = require("joi");

const taskCreateDto = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  userId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  status: Joi.string()
    .valid("created", "started", "inprogress", "ended")
    .required(),
});

module.exports = { taskCreateDto };
