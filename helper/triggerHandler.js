import axios from "axios";
import { io } from "../app.js";
import ErrorException from "../src/error/ErrorException.js";
import { mediaRepository } from "../src/repository/mediaRepository.js";
import getTypeMedia from "./getTypeMedia.js";

const videoPlayingTrigger = () => {
  io.on("connection", (socket) => {
    socket.on("the video has played", async (message) => {
      if (message.status == true) {
        await mediaRepository.updateById(message.id, {
          played: message.status,
        });
      }
    });
  });
};

const getDataTiktok = async (tiktokUrl) => {
  try {
    const url = "https://www.tiktok.com/oembed?url=" + tiktokUrl;
    const htmlEmbed = await axios.get(url);
    return htmlEmbed.data;
  } catch (error) {
    new ErrorException(error);
  }
};

const showNewDataTrigger = async (uuid) => {
  const data = await mediaRepository.getMedia(uuid);
  const typeMedia = getTypeMedia(data.linkMedia);

  if (typeMedia == "tiktok") {
    const htmlTiktokEmbed = await getDataTiktok(data.linkMedia);
    data.tiktokEmbed = htmlTiktokEmbed;
  }
  io.emit("newData", data);
};

export { videoPlayingTrigger, showNewDataTrigger };
