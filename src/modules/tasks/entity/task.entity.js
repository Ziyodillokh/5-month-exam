const mongoose = require("mongoose");

const formatDate = (date) => {
  const pad = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  };
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
      get: formatDate,
    },
    endDate: {
      type: Date,
      required: true,
      get: formatDate, // get formati json ga o'zgartartirish uchun ishlatilarkan
    },
    status: {
      type: String,
      enum: ["created", "started", "inprogress", "ended"],
      required: true,
    },
  },
  { toJSON: { getters: true } }
);

const TaskModel = mongoose.model("Task", taskSchema, "tasks");

module.exports = { TaskModel };
