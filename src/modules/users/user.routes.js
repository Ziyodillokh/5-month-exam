const { Router } = require("express");
const { userController } = require("./user.controller");
const { guardMiddleware } = require("../../middlewares/guard.middleware");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = Router();

router.post(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  userController.create.bind(userController)
);
router.get(
  "/",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  userController.getAll.bind(userController)
);
router.get(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  userController.getById.bind(userController)
);
router.put(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  userController.update.bind(userController)
);
router.delete(
  "/:id",
  authMiddleware.verifyToken.bind(authMiddleware),
  guardMiddleware
    .verifyRole("admin", "leader", "manager")
    .bind(guardMiddleware),
  userController.delete.bind(userController)
);

module.exports = { router };
