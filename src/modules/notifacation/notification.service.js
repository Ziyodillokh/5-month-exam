const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { NotificationModel } = require("./entity/notification.entity");

class NotificationService {
  #notificationRepo;
  constructor(notificationRepo) {
    this.#notificationRepo = notificationRepo;
  }

  // getAll

  async getAll(userId) {
    const filter = {};
    if (userId) {
      filter.$or = [{ userId }, { isGlobal: true }];
    } else {
      filter.isGlobal = true;
    }

    const notifications = await this.#notificationRepo.find(filter);

    if (!notifications.length) {
      throw new CustomError(404, "No notifications found");
    }

    return new ResData(
      200,
      "Notifications fetched successfully",
      notifications
    );
  }

  // create

  async create(dto) {
    const { title, message, isGlobal, userId } = dto;

    if (typeof isGlobal !== "boolean") {
      throw new CustomError(400, "isGlobal must be a boolean");
    }

    let notificationData = {
      title,
      message,
      isGlobal,
      userId,
    };

    const data = await this.#notificationRepo.create(notificationData);

    const resData = new ResData(201, "notification created successfully", data);
    return resData;
  }

  // delete

  async delete(id) {
    const data = await this.#notificationRepo.findByIdAndDelete(id);

    if (!data) {
      throw new CustomError(404, "Notification not found");
    }

    return new ResData(200, "deleted", data);
  }
}

const notificationService = new NotificationService(NotificationModel);

module.exports = { notificationService };
