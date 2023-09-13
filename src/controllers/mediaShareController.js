import { userServices } from "../../services/userServices.js";
import prisma from "../app/database.js";
import { mediServices } from "../../services/mediaServices.js";
import { io } from "../../index.js";

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
      showNewData(req);
      res.redirect("back");
    } catch (e) {
      next(e);
    }
  },
};

export default mediaShareController;
