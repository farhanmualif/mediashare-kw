import express from "express";
import { userController } from "../controllers/userController.js";
import mediaShareController from "../controllers/mediaShareController.js";
import { authentication } from "../middleware/authenthication.js";
import uploadFile from "../middleware/multer.js";
import { paymentSuccess } from "../middleware/paymentSuccess.js";
const web = express.Router();
const upload = uploadFile();

web.get("/", mediaShareController.sendDonationForm);
web.get("/form/register", userController.registerForm);
web.get("/form/login", userController.loginForm);
web.post("/register", userController.register);
web.post("/login", userController.login);
web.post("/send-donation", mediaShareController.payment);
web.get("/display/:uuid", userController.display);
web.get("/donate/:name", mediaShareController.sendDonationForm);
web.post("/pay-now", mediaShareController.payNow);

web.get("/payment-success", mediaShareController.paymentSuccessPage);
web.get("/payment-pending", mediaShareController.paymentPendingPage);
web.get("/payment-failed", mediaShareController.paymentFailedPage);

web.use(authentication);
web.get("/index", userController.index);
web.post(
  "/update-profile",
  upload.single("input-file-image-update"),
  userController.updateProfile
);
web.get("/detail-profile", userController.detailProfile);
web.post("/logout", userController.logout);

export default web;
