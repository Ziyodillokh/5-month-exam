const mongoose = require("mongoose");
const { config } = require("../common/config/index");

class DbConection {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    await mongoose.connect(this.config.MONGODB_URL);
  }
}

const dbConection = new DbConection(config);

module.exports = { dbConection };