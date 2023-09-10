import { mediaRepository } from "../repository/mediaRepository.js";
import validation from "../src/app/validation/validation.js";
import mediaValidation from "../src/app/validation/mediaValidation.js";

export const mediServices = {
  insertMedia: async (request) => {
    const splitLinkDonatur = request.linkDonatur.split("/");
    const uuidReciver = splitLinkDonatur[splitLinkDonatur.length - 1];
    request.receiverId = uuidReciver;
    request.nominal = parseInt(request.nominal);
    delete request.linkDonatur;
    // validation
    const value = validation(mediaValidation.sendMediaValidation, request);
    // insert request
    const insert = mediaRepository.insertMedia(value);
    return insert;
  },
};
