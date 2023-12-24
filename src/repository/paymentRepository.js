import prisma from "../app/database.js";

export const paymentRepository = {
  insert: async (data) => {
    const respons = await prisma.payment.create(data);
    return respons;
  },
};
