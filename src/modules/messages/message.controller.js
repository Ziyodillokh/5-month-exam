const { messageService } = require("./message.service");
const { validator } = require("../../lib/validator");
const { messageCreateDto } = require("./dto/message.dto");

class MessageController {
  #messageService;

  constructor(messageService) {
    this.#messageService = messageService;
  }

  // create
  async create(req, res, next) {
    try {
      const dto = req.body;

      validator(messageCreateDto, dto);

      const resData = await this.#messageService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // getAll

  async getAll(req, res, next) {
    try {
      const resData = await this.#messageService.getAll();
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
  
  // update
  async update(req, res, next) {
    try {
      const dto = req.body;
      const id = req.params.id;
      const resData = await this.#messageService.update(id, dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // delete

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const resData = await this.#messageService.delete(id);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const messageController = new MessageController(messageService);

module.exports = { messageController };
