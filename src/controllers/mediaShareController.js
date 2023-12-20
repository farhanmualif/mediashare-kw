import { userServices } from "../services/userServices.js";
import { mediServices } from "../services/mediaServices.js";
import { showNewDataTrigger } from "../../helper/triggerHandler.js";

const mediaShareController = {
  sendDonationForm: async (req, res, next) => {
    try {
      if (req.params && req.params.name) {
        const user = await userServices.getUser(
          {
            name: req.params.name,
          },
          {
            uuid: true,
            email: true,
            name: true,
            images: true,
            openDonation: true,
          }
        );
        res.render("donature-page", { user });
      } else {
        res.render("donature-page");
      }
    } catch (error) {
      next(error);
    }
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
