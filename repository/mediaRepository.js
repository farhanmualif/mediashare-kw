import prisma from "../src/app/database";

export const mediaRepository = {
  insertMedia: (data) => {
    prisma.media.create({
      data,
    });
  },
};
