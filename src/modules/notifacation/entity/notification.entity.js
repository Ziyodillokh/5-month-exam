const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  isGlobal: {
    type: Boolean,
    required: true,
  },
});

const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema,
  "notifications"
);

module.exports = { NotificationModel };
