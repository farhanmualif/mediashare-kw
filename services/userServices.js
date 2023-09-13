import { userRepository } from "../repository/userRepository.js";
import prisma from "../src/app/database.js";
import {
  registerUserValidation,
  loginUserValidation,
} from "../src/app/validation/userValildation.js";
import validation from "../src/app/validation/validation.js";
import bcrypt from "bcrypt";
import ErrorException from "../src/error/ErrorException.js";

export const userServices = {
  getUser: async (where) => {
    const user = await userRepository.getUser(where);
    return user;
  },

  getUsers: async () => {
    const users = await userRepository.getUsers();
    return users;
  },

  register: async (request) => {
    try {
      const user = validation(registerUserValidation, request);
      user.value.password = await bcrypt.hash(user.value.password, 10);
      const create = userRepository.createUser(user.value);
      return create;
    } catch (error) {
      throw error;
    }
  },

  login: async (credential) => {
    const validate = validation(loginUserValidation, credential);
    const user = await prisma.user.findUnique({
      where: {
        email: credential.email,
      },
    });

    if (!user) {
      throw new ErrorException(401, "Email or password wrong");
    }
    const matchPassword = await bcrypt.compare(
      validate.value.password,
      user.password
    );

    if (!matchPassword) {
      throw new ErrorException(401, "Email or password wrong");
    }
    return {
      message: "berhasil login",
      status: true,
      user,
    };
  },

  updateUser: async (where, data) => {
    try {
      const update = userRepository.updateUser(where, data);
      return update;
    } catch (error) {
      throw error;
    }
  },
};
