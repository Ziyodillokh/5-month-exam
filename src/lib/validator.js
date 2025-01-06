const { CustomError } = require("./customError");

function validator(schema, data) {
  const { error } = schema.validate(data);

  if (error) {
    throw new CustomError(400, error.message);
  }
}

module.exports = { validator };
