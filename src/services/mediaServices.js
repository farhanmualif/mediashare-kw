import { mediaRepository } from "../repository/mediaRepository.js";
import validation from "../app/validation/validation.js";
import mediaValidation from "../app/validation/mediaValidation.js";
import formHandler from "../../helper/formHandler.js";
import getTypeMedia from "../../helper/getTypeMedia.js";
import getRecipientName from "../../helper/getRecipientName.js";

export const mediServices = {
  insertMedia: async (request) => {
    const reqForm = formHandler(request);

    /* get type media */
    reqForm.typeMedia = getTypeMedia(reqForm.linkMedia);

    /* get recipient Name */
    reqForm.recipientsName = getRecipientName(reqForm.linkDonatur);
    reqForm.nominal = parseInt(reqForm.nominal);
    delete reqForm.linkDonatur;

    // validation
    const value = validation(mediaValidation.sendMediaValidation, reqForm);
    // insert request
    const insert = mediaRepository.insertMedia(value);
    return insert;
  },
};
