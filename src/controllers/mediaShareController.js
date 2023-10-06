import { userServices } from "../../services/userServices.js";
import { mediServices } from "../../services/mediaServices.js";
import { io } from "../../index.js";
import { mediaRepository } from "../../repository/mediaRepository.js";

const showNewData = async (uuid) => {
  const data = await mediaRepository.getMedia(uuid);
  io.emit("newData", data);
};


const mediaShareController = {
  sendDonationForm: async (req, res) => {
    const user = await userServices.getUser({
      name: req.params.name,
    });
    res.render("donature-page", { user });
  },

  sendDonation: async (req, res, next) => {
    try {
      const media = await mediServices.insertMedia(req.body);
      showNewData(media.uuid);
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  },
};

export default mediaShareController;
