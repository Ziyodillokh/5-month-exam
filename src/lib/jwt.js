const { config } = require("../common/config/index");
const jwt = require("jsonwebtoken");

class JWT {
  constructor(accSecret, refSecret, accTime, refTime) {
    this.accSecret = accSecret;
    this.refSecret = refSecret;
    this.accTime = accTime;
    this.refTime = refTime;
  }

  generateAcctoken(data) {
    const payload = {
      data,
      exp: Math.trunc(Date.now() / 1000) + this.accTime,
    };
    return jwt.sign(payload, this.accSecret);
  }

  generateReftoken(data) {
    const payload = {
      data,
      exp: Math.trunc(Date.now() / 1000) + this.refTime,
    };
    return jwt.sign(payload, this.refSecret);
  }

  verifyAccToken(token) {
    const { data } = jwt.verify(token, this.accSecret);
    return data;
  }
  verifyRefToken(token) {
    const { data } = jwt.verify(token, this.refSecret);
    return data;
  }
}

const jwtIntance = new JWT(
  config.JWT_ACC_SECRET,
  config.JWT_REF_SECRET,
  config.JWT_ACC_TIME,
  config.JWT_REF_TIME
);

module.exports = { jwtIntance };
