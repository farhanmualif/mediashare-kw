import prisma from "../src/app/database.js";

export const mediaRepository = {
  insertMedia: (data) => {
     data = data.value;
    const mediaCreated = prisma.media.create({
      data,
    });
    return mediaCreated;
  },
};
