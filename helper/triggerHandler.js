import axios from "axios";
import { io } from "../index.js";
import ErrorException from "../src/error/ErrorException.js";
import { mediaRepository } from "../src/repository/mediaRepository.js";
import getTypeMedia from "./getTypeMedia.js";

const videoPlayingTrigger = () => {
  io.on("connection", (socket) => {
    // console.log("test...");
    socket.on("the video has played", (message) => {
      console.log(message);
      if (message == false) {
        const result = mediaRepository.updateWhere({
          id: message.id,
          played: true,
        });
        console.log(result);
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
