const bcrypt = require("bcrypt");

class Bcrypt {
  constructor(saltRounds) {
    this.saltRounds = saltRounds;
  }

  async hash(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

const bcryptIntance = new Bcrypt(10);

module.exports = { bcryptIntance };
