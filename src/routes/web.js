import express from "express";
import { userController } from "../controllers/userController.js";
import mediaShareController from "../controllers/mediaShareController.js";
import { authentication } from "../middleware/authenthication.js";
import uploadFile from "../middleware/multer.js";
const web = express.Router();
const upload = uploadFile();

web.get("/", mediaShareController.sendDonationForm);
web.get("/form/register", userController.registerForm);
web.get("/form/login", userController.loginForm);
web.post("/register", userController.register);
web.post("/login", userController.login);
web.post("/send-donation", mediaShareController.sendDonation);
web.get("/display/:uuid", userController.display);
web.get("/donate/:name", mediaShareController.sendDonationForm);

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
