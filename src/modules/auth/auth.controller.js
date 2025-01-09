const { authService } = require("./auth.service");
const { LoginDto } = require("./dto/auth.login.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");
class AuthController {
  #authService;
  constructor(authService) {
    this.#authService = authService;
  }

  async login(req, res, next) {
    try {
      const dto = req.body;

      validator(LoginDto, dto);

      const resData = await this.#authService.login(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(400, "Refresh token is required");
      }

      const [type, tokenValue] = token.split(" ");

      if (type !== "Bearer" || !tokenValue) {
        throw new CustomError(400, "Invalid token type");
      }

      const resData = await authService.refresh(tokenValue);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      error.statusCode = 401;
      next(error);
    }
  }

  //change password

  async changePassword(req, res, next) {
    try {
      const userId = req.currentUser.id;
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      const result = await this.#authService.changePassword(
        userId,
        oldPassword,
        newPassword,
        confirmNewPassword
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController(authService);

module.exports = { authController };
