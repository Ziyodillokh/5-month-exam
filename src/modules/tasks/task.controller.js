const { taskService } = require("./task.service");
const { taskCreateDto } = require("./dto/task.dto");
const { validator } = require("../../lib/validator");
const { CustomError } = require("../../lib/customError");

class TaskController {
  #taskService;
  constructor(taskService) {
    this.#taskService = taskService;
  }

  // getAll
  async getAll(req, res, next) {
    try {
      const resdata = await this.#taskService.getAll();
      res.status(resdata.statusCode).json(resdata);
    } catch (error) {
      next(error);
    }
  }

  // create
  async create(req, res, next) {
    try {
      const dto = req.body;
      const userId = req.params.userId;

      if (!userId) {
        throw new CustomError(400, "`userId` is required");
      }

      validator(taskCreateDto, { ...dto, userId });

      const resData = await this.#taskService.create(
        { ...dto, userId },
        userId
      );

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // getById
  async getById(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new CustomError(400, "id is required");
      }

      const resData = await this.#taskService.getById(id);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // getUserById
  async getUserById(req, res, next) {
    try {
      const userId = req.params.userId; 

      if (!userId) {
        throw new CustomError(400, "userId is required");
      }

      const resData = await this.#taskService.getByUserId(userId);
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
      const resData = await this.#taskService.update(id, dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  // delete
  
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const resData = await this.#taskService.delete(id);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const taskController = new TaskController(taskService);

module.exports = { taskController };

