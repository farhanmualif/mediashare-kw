import { userRepository } from "../repository/userRepository.js";
import registerUserValidation from "../src/app/validation/userValildation.js";
import validation from "../src/app/validation/validation.js";
import bcrypt from "bcrypt";

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
      user.password = await bcrypt.hash(user.password, 10);
      const create = userRepository.createUser(user);
      return create;
    } catch (error) {
      throw error;
    }
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
