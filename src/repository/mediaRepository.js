import prisma from "../app/database.js";

export const mediaRepository = {
  insertMedia: (data) => {
    data = data.value;
    const mediaCreated = prisma.media.create({
      data,
    });

    return mediaCreated;
  },

  getMedia: (where) => {
    const media = prisma.media.findFirstOrThrow({
      where: where,
    });
    return media;
  },

  updateById: async (id, data) => {
    const updateMediaData = await prisma.media.update({
      where: {
        id,
      },
      data,
    });
    return updateMediaData;
  },
};
