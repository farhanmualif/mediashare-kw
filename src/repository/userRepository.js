import prisma from "../app/database.js";

export const userRepository = {
  getUser: async (where) => {
    const user = await prisma.user.findFirst({
      where,
    });
    if (!user) {
      return null;
    }
    return user;
  },

  getUsers: async () => {
    const users = await prisma.user.findMany();
    if (!users) {
      return null;
    }
    return users;
  },

  createUser: async (data) => {
    const count = await prisma.user.count({
      where: {
        email: data.email,
      },
    });

    if (count === 1) {
      return `email ${data.email} is exists`;
    } else {
      const insert = await prisma.user.create({
        data,
      });
      return insert;
    }
  },

  updateUser: async (where, data) => {
    const updated = await prisma.user.update({
      where,
      data,
    });
    return updated;
  },
};
