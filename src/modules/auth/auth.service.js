const { CustomError } = require("../../lib/customError");
const { bcryptIntance } = require("../../lib/bcrypt");
const { jwtIntance } = require("../../lib/jwt");
const { ResData } = require("../../lib/resData");
const { userService } = require("../users/user.service");
class AuthService {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async login(dto) {
    const { data, statusCode } = await this.#userService.getByEmail(dto.email);

    if (statusCode === 404) {
      throw new CustomError(400, "email or password is incorrect");
    }

    const isValid = await bcryptIntance.compare(dto.password, data.password);

    if (!isValid) {
      throw new CustomError(400, "email or password is incorrect");
    }

    const tokenData = { id: data._id };

    const accessToken = jwtIntance.generateAcctoken(tokenData);
    const refreshToken = jwtIntance.generateReftoken(tokenData);

    const resData = new ResData(200, "Success", {
      user: data,
      token: { accessToken, refreshToken },
    });

    return resData;
  }

  async refresh(token) {
    const payload = jwtIntance.verifyRefToken(token);

    const { data } = await this.#userService.getById(payload.id);

    const accessToken = jwtIntance.generateAcctoken(payload);
    const refreshToken = jwtIntance.generateReftoken(payload);

    const resData = new ResData(200, "tokens refreshed successfully", {
      user: data,
      token: { accessToken, refreshToken },
    });

    return resData;
  }

  async changePassword(userId, oldPassword, newPassword, confirmNewPassword) {
    const { data, statusCode } = await this.#userService.getById(userId);

    if (!confirmNewPassword) {
      throw new CustomError(400, "confirmNewPassword is required");
    }

    if (newPassword !== confirmNewPassword) {
      throw new CustomError(400, "Password incorrect");
    }

    if (statusCode === 404 || !data) {
      throw new CustomError(404, "User not found");
    }

    const isOldPasswordValid = await bcryptIntance.compare(
      oldPassword,
      data.password
    );

    if (!isOldPasswordValid) {
      throw new CustomError(400, "Old password is incorrect");
    }

    const hashedPassword = await bcryptIntance.hash(newPassword);

    const updatedUser = await this.#userService.updateUserById(userId, {
      password: hashedPassword,
    });

    return new ResData(200, "Password changed successfully", updatedUser);
  }
}

const authService = new AuthService(userService);

module.exports = { authService };
