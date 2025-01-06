require("dotenv").config();

const config = {
  PORT: Number(process.env.PORT),
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_ACC_SECRET: process.env.JWT_ACC_SECRET,
  JWT_REF_SECRET: process.env.JWT_REF_SECRET,
  JWT_ACC_TIME: Number(process.env.JWT_ACC_TIME),
  JWT_REF_TIME: Number(process.env.JWT_REF_TIME),
};

module.exports = { config };
