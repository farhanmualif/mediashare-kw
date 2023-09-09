import prisma from "../src/app/database.js";

export const mediaRepository = {
  insertMedia: (data) => {
    const mediaCreated = prisma.media.create({
      data,
    });
    return mediaCreated;
  },
};
