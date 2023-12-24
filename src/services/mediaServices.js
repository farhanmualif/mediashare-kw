import { mediaRepository } from "../repository/mediaRepository.js";
import mediaValidation from "../app/validation/mediaValidation.js";
import formHandler from "../../helper/formHandler.js";
import getTypeMedia from "../../helper/getTypeMedia.js";
import getRecipientName from "../../helper/getRecipientName.js";
import { paymentRepository } from "../repository/paymentRepository.js";
import midtransClient from "midtrans-client";
import paymentValidation from "../app/validation/paymentValidation.js";
import validation from "../app/validation/validation.js";
import prisma from "../app/database.js";

export const mediServices = {
  insertMedia: async (request) => {
    let reqForm = formHandler(request);
    reqForm.typeMedia = getTypeMedia(reqForm.linkMedia);

    delete reqForm.linkDonatur;
    delete reqForm.nominal;
    const value = validation(mediaValidation.sendMediaValidation, reqForm);

    const data = {
      data: value,
    };

    console.log("cek nama: ", data.data.value.name);

    const result = await prisma.$transaction(async function (prisma) {
      /* insert media */
      const createMedia = await prisma.media.create({
        data: {
          name: data.data.value.name,
          played: false,
          message: data.data.value.message,
          linkMedia: data.data.value.linkMedia,
          typeMedia: reqForm.typeMedia,
          startAtSecond: data.data.value.startAtSecond,
          duration: data.data.value.duration,
          recipientsName: reqForm.recipientsName,
        },
      });

      /* insert payment */
      const insertPayment = await prisma.payment.create({
        data: {
          uuid: data.data.value.uuid,
          method: data.data.value.method,
          grossAmount: data.data.value.grossAmount,
          mediaId: createMedia.id,
        },
      });
      return { ...createMedia, ...insertPayment };
    });
    return result;
  },
};
