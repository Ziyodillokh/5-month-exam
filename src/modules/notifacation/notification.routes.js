const { Router } = require("express");
const { notificationController } = require("./notification.controller");
const { guardMiddleware } = require("../../middlewares/guard.middleware");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", notificationController.getAll.bind(notificationController));

router.post(
  "/", // isGlobal false bo'lsa userIdni bodydan oladi
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  notificationController.create.bind(notificationController)
);

router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  notificationController.delete.bind(notificationController)
);

module.exports = { router };
