import { userServices } from "../services/userServices.js";
import { mediServices } from "../services/mediaServices.js";
import { showNewDataTriggerIntoRecipent } from "../../helper/triggerHandler.js";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { io } from "../../app.js";

/* Configure midtrans */
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

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

  payment: async (req, res, next) => {
    try {
      console.log("req body", req.body);
      /* Midtrans Parameter */
      let parameter = {
        transaction_details: {
          order_id: uuidv4(),
          gross_amount: req.body.nominal,
        },
      };

      /* Midtrans Token */
      const token = await snap.createTransactionToken(parameter);
      const clientKey = process.env.MIDTRANS_CLIENT_KEY;
      res.render("payment", { token, clientKey, request: req.body });
    } catch (e) {
      next(e);
    }
  },

  payNow: async (req, res, next) => {
    try {
      console.log("request body", req.body);
      const respons = await mediServices.insertMedia(req.body);
      res.json({
        data: respons,
      });

      // showNewDataTriggerIntoRecipent(media.recipientsName);
      req.flash("success", "send donation successfully");
    } catch (error) {
      next(error);
    }
  },
};

export default mediaShareController;
