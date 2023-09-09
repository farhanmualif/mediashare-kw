import { mediaRepository } from "../repository/mediaRepository.js";
import validation from "../src/app/validation/validation.js";
import mediaValidation from "../src/app/validation/mediaValidation.js";

export const mediServices = {
  insertMedia: async (data) => {
    const splitLinkDonatur = data.linkDonatur.split("/");
    const uuidReciver = splitLinkDonatur[splitLinkDonatur.length - 1];
    data.receiverId = uuidReciver;
    data.nominal = parseInt(data.nominal);
    delete data.linkDonatur;
    // validation
    const value = validation(mediaValidation.sendMediaValidation, data);
    // insert data
    const insert = mediaRepository.insertMedia(value);
    return insert;
  },
};
