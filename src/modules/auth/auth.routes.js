const { Router } = require("express");
const { authController } = require("./auth.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const router = Router();

router.post("/login", authController.login.bind(authController));
router.post(
  "/refresh",
  //   authMiddleware.verifyToken.bind(authMiddleware), // headers.authorization ga 2 ta token berib bolmayapti
  authController.refresh.bind(authController)
);

// password ni o'zgartirayotganda userIdni token orqali oladi Header authorizationdan
router.put(
  "/change-password",
  authMiddleware.verifyToken.bind(authMiddleware),
  authController.changePassword.bind(authController)
);

module.exports = { router };
