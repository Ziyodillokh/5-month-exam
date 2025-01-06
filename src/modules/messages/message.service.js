const { CustomError } = require("../../lib/customError");
const { MessageModel } = require("./entity/message.entity");
const { ResData } = require("../../lib/resData");
class MessageService {
  #messageRepo;

  constructor(messageRepo) {
    this.#messageRepo = messageRepo;
  }

  async create(dto) {
    const { message, from, to, isRead } = dto;
    let messageData = {
      from,
      message,
      to,
      isRead,
    };

    const data = await this.#messageRepo.create(messageData);

    const resData = new ResData(201, "message created successfully", data);
    return resData;
  }

  // getAll

  async getAll() {
    const data = await this.#messageRepo.find();

    if (!data) {
      throw new CustomError(404, "massege not found");
    }

    const resData = new ResData(200, "success", data);
    return resData;
  }

  // update

  async update(id, dto) {
    const data = await this.#messageRepo.findByIdAndUpdate(
      id,
      {
        message: dto.message,
        from: dto.from,
        to: dto.to,
        isRead: dto.isRead,
      },
      { new: true }
    );

    if (!data) {
      throw new CustomError(404, "message not found by id");
    }
    const resData = new ResData(200, "update successfully", data);

    return resData;
  }

  // delete

  async delete(id) {
    const data = await this.#messageRepo.findByIdAndDelete(id);

    if (!data) {
      throw new CustomError(404, "message not found");
    }

    return new ResData(200, "deleted", data);
  }
}

const messageService = new MessageService(MessageModel);
module.exports = { messageService };
