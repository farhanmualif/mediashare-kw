import { userServices } from "../../services/userServices.js";
import prisma from "../app/database.js";
import { mediServices } from "../../services/mediaServices.js";
import { io } from "../../index.js";
import validation from "../app/validation/validation.js";
import mediaValidation from "../app/validation/mediaValidation.js";

const showNewData = async (req) => {
  const data = await prisma.media.findMany({
    where: {
      receiverId: req.params.uuid,
      played: false,
    },
  });
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
      await mediServices.insertMedia(req.body);
      res.redirect("back");
    } catch (e) {
      req.flash("failure", e);
      res.redirect("back");
      next(e);
    }
  },
};

export default mediaShareController;
