import prisma from "../app/database.js";

export const mediaRepository = {
  insertMedia: (data) => {
    data = data.value;
    const mediaCreated = prisma.media.create({
      data,
    });

    return mediaCreated;
  },

  getMedia: (uuid) => {
    const media = prisma.media.findUnique({
      where: {
        uuid,
      },
    });
    return media;
  },

  updateWhere: async ({ where, data }) => {
    const updateMediaData = await prisma.media.update({
      where,
      data,
    });

    return updateMediaData;
  },
};
