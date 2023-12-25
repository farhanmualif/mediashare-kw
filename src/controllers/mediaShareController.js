import { userServices } from "../services/userServices.js";
import { mediServices } from "../services/mediaServices.js";
import { showNewDataTriggerIntoRecipent } from "../../helper/triggerHandler.js";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";

/* Configure midtrans */
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const mediaShareController = {
  sendDonationForm: async (req, res, next) => {
    try {
      req.session.paymentSuccess ? delete req.session.paymentSuccess : "";
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
      /* Midtrans Parameter */
      let parameter = {
        transaction_details: {
          order_id: uuidv4(), 
          gross_amount: req.body.nominal,
        },
        callbacks: {
          finish: "https://649a-125-163-253-130.ngrok-free.app/payment-success",
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

  paymentSuccessPage: (req, res) => {
    res.render("payment-status/success");
  },

  paymentFailedPage: (req, res) => {
    res.render("payment-status/failed");
  },
  paymentPendingPage: (req, res) => {
    console.log("masuk");
    res.render("payment-status/pending");
  },

  payNow: async (req, res, next) => {
    try {
      req.session.paymentSuccess = true;
      const respons = await mediServices.insertMedia(req.body);
      showNewDataTriggerIntoRecipent(respons.recipientsName);
      res.render("payment-status/success");
    } catch (error) {
      next(error);
    }
  },
};

export default mediaShareController;
