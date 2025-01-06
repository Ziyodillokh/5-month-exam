const { CustomError } = require("../lib/customError");

class GuardMiddleware {
  verifyRole(...roles) {
    return async function (req, res, next) {
      try {
        if (roles.length === 0) {
          return next();
        }

        const currentUser = req.currentUser;

        if (!currentUser) {
          throw new CustomError(500, "currentUser is not provided");
        }

        if (!roles.includes(currentUser.role)) {
          throw new CustomError(403, "You can't access this API");
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

const guardMiddleware = new GuardMiddleware();
module.exports = { guardMiddleware };
