const { notificationService } = require("./notification.service");
const { CustomError } = require("../../lib/customError");
const { validator } = require("../../lib/validator");
const { notificationCreateDto } = require("./dto/notification.dto");
const { jwtIntance } = require("../../lib/jwt");
class NotificationController {
  #notificationService;
  constructor(notificationService) {
    this.#notificationService = notificationService;
  }

  // getAll

  async getAll(req, res, next) {
    try {
      const token = req.headers.authorization;

      let userId = null;

      if (token) {
        const payload = token.split(" ");
        if (payload.length !== 2 || payload[0] !== "Bearer") {
          throw new CustomError(400, "Invalid token format");
        }

        const tokenWithoutBearer = payload[1];
        const decodedToken = jwtIntance.verifyAccToken(tokenWithoutBearer);
        userId = decodedToken.id;
      }

      const resData = await this.#notificationService.getAllNotifications(
        userId
      );

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // craete

  async create(req, res, next) {
    try {
      const dto = req.body;

      if (dto.isGlobal === false && !dto.userId) {
        throw new CustomError(400, "userId is required when isGlobal is false");
      }

      validator(notificationCreateDto, dto);

      const resData = await this.#notificationService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // delete

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const resData = await this.#notificationService.delete(id);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}
const notificationController = new NotificationController(notificationService);
module.exports = { notificationController };
