const { CustomError } = require("../lib/customError");
const { jwtIntance } = require("../lib/jwt");
const { userService } = require("../modules/users/user.service");

class AuthMiddleware {
  #jwtIntance;
  #userService;
  constructor(jwtIntance, userService) {
    this.#jwtIntance = jwtIntance;
    this.#userService = userService;
  }

  async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(401, "No token provided");
      }

      const [type, tokenValue] = token.split(" ");
      if (type !== "Bearer") {
        throw new CustomError(401, "Invalid token type");
      }

      const payload = this.#jwtIntance.verifyAccToken(tokenValue);

      const { data } = await this.#userService.getById(payload.id);

      if (!data) {
        throw new CustomError(404, "User not found");
      }

      req.currentUser = data;

      next();
    } catch (error) {
      error.statusCode = 401;
      next(error);
    }
  }
}

const authMiddleware = new AuthMiddleware(jwtIntance, userService);

module.exports = { authMiddleware };
