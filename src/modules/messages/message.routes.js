const { Router } = require("express");
const router = Router();
const { messageController } = require("./message.controller");

router.post("/", messageController.create.bind(messageController));

router.get("/", messageController.getAll.bind(messageController));

router.put("/:id", messageController.update.bind(messageController));

router.delete("/:id", messageController.delete.bind(messageController));

module.exports = { router };
