const { CustomError } = require("../../lib/customError");
const { ResData } = require("../../lib/resData");
const { UserModel } = require("./entity/user.entity");
const mongoose = require("mongoose");

class UserService {
  #userRepo;
  constructor(userRepo) {
    this.#userRepo = userRepo;
  }

  // create

  async create(dto) {
    const data = await this.#userRepo.create({
      fullname: dto.fullname,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });

    const resData = new ResData(201, "User created successfully", data);
    return resData;
  }

  // getById

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(400, "Invalid id format");
    }

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new CustomError(404, "User not found by id");
    }

    return new ResData(200, "User found successfully", user);
  }

  // getAll

  async getAll() {
    const data = await this.#userRepo.find();

    if (!data) {
      throw new CustomError(404, "User not found");
    }

    const resData = new ResData(200, "success", data);

    return resData;
  }

  // getByEmail

  async getByEmail(email) {
    const data = await this.#userRepo.findOne({ email });

    const resData = new ResData(200, "User fetched successfully", data);

    if (!data) {
      resData.statusCode = 404;
      resData.message = "User not found by email";
    }

    return resData;
  }

  //update

  async update(id, dto) {
    const data = await this.#userRepo.findByIdAndUpdate(
      id,
      {
        fullname: dto.fullname,
        password: dto.password,
        email: dto.email,
        role: dto.role,
      },
      { new: true }
    );

    if (!data) {
      throw new CustomError(404, "User not found by id");
    }
    const resData = new ResData(200, "update successfully", data);

    return resData;
  }

  // delete
  async delete(id) {
    const data = await this.#userRepo.findByIdAndDelete(id);

    if (!data) {
      throw new CustomError(404, "user not found");
    }

    return new ResData(200, "deleted", data);
  }

  // update

  async updateUserById(userId, updateData) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      throw new CustomError(404, "User not found");
    }
    return updatedUser;
  }
}

const userService = new UserService(UserModel);

module.exports = { userService };
