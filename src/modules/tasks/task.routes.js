const { Router } = require("express");
const { taskController } = require("./task.controller");
const { guardMiddleware } = require("../../middlewares/guard.middleware");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = Router();

router.post(
  "/:userId",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  taskController.create.bind(taskController)
);

router.get(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  taskController.getAll.bind(taskController)
);

router.get(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  taskController.getById.bind(taskController)
);

router.get(
  "/:userId",
  authMiddleware.verifyToken.bind(authMiddleware),
  taskController.getUserById.bind(taskController)
);

router.put(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  taskController.update.bind(taskController)
);

router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  taskController.delete.bind(taskController)
);

module.exports = { router };
