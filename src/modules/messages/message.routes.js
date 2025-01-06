const { Router } = require("express");
const router = Router();
const { messageController } = require("./message.controller");

router.post("/", messageController.create.bind(messageController)); // Create xabar

router.get("/", messageController.getAll.bind(messageController)); // GetAll xabarlar

router.put("/:id", messageController.update.bind(messageController)); // Update xabar

router.delete("/:id", messageController.delete.bind(messageController)); // Delete xabar

module.exports = { router };
