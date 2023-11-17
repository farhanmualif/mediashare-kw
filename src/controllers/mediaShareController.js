import { userServices } from "../services/userServices.js";
import { mediServices } from "../services/mediaServices.js";
import { showNewDataTrigger } from "../../helper/triggerHandler.js";

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
      showNewDataTrigger(media.uuid);
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  },
};

export default mediaShareController;
