const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: false,
  },
});

const MessageModel = mongoose.model("Message", messageSchema, "messages");

module.exports = { MessageModel };
