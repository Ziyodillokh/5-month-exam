const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { TaskModel } = require("./entity/task.entity");
const mongoose = require("mongoose");

class TaskService {
  #taskRepo;
  constructor(taskRepo) {
    this.#taskRepo = taskRepo;
  }

  // create

  async create(dto, userId) {
    const data = await this.#taskRepo.create({
      title: dto.title,
      desc: dto.desc,
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: dto.status,
      userId,
    });

    const resData = new ResData(201, "task created successfully", data);
    return resData;
  }

  

  async getByUserId(userId) {
    const data = await TaskModel.findOne({ userId });

    if (!data) {
      return new ResData(404, "Task not found for this userId");
    }

    return new ResData(200, "Task fetched successfully", data);
  }

  // getById

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(400, "Invalid ID format");
    }

    const data = await this.#taskRepo.findById(id);

    if (!data) {
      throw new CustomError(404, "task not found by id");
    }

    const resData = new ResData(200, "task fetched successfully", data);
    return resData;
  }

  // getAll

  async getAll() {
    const data = await this.#taskRepo.find();

    if (!data) {
      throw new CustomError(404, "task not found");
    }

    const resData = new ResData(200, "success", data);

    return resData;
  }

  // update

  async update(id, dto) {
    const data = await this.#taskRepo.findByIdAndUpdate(
      id,
      {
        title: dto.title,
        desc: dto.desc,
        status: dto.status,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
      { new: true }
    );

    if (!data) {
      throw new CustomError(404, "task not found by id");
    }
    const resData = new ResData(200, "update successfully", data);

    return resData;
  }

  // delete
  
  async delete(id) {
    const data = await this.#taskRepo.findByIdAndDelete(id);

    if (!data) {
      throw new CustomError(404, "task not found");
    }

    return new ResData(200, "deleted", data);
  }

  // update by id

  async updateById(TaskId, updateData) {
    const updatedTask = await TaskModel.findByIdAndUpdate(TaskId, updateData, {
      new: true,
    });
    if (!updatedTask) {
      throw new CustomError(404, "task not found");
    }
    return updatedTask;
  }
}

const taskService = new TaskService(TaskModel);

module.exports = { taskService };
