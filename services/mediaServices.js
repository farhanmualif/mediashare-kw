import { mediaRepository } from "../repository/mediaRepository.js";

export const mediServices = {
  insertMedia: (data) => {
    const splitLinkDonatur = data.linkDonatur.split("/");
    const uuidReciver = splitLinkDonatur[splitLinkDonatur.length - 1];
    data.receiverId = uuidReciver;
    data.nominal = parseInt(data.nominal);
    delete data.linkDonatur;
    const value = validation(mediaValidation.sendMediaValidation, data);
    const insert =  mediaRepository.insertMedia(value);
    return insert
  },
};
