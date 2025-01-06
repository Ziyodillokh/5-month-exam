const { Router } = require("express");
const userRoutes = require("./users/user.routes");
const authRoutes = require("./auth/auth.routes");
const taskRoutes = require("./tasks/task.routes");
const notificationRoutes = require("./notifacation/notification.routes");
const messageRoutes = require("./messages/message.routes");
const router = Router();

router.use("/users", userRoutes.router);
router.use("/auth", authRoutes.router);
router.use("/task", taskRoutes.router);
router.use("/notification", notificationRoutes.router);
router.use("/message", messageRoutes.router);

module.exports = { router };
