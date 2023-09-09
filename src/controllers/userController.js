import { io } from "../../index.js";
import { userServices } from "../../services/userServices.js";
import prisma from "../app/database.js";
import bcrypt from "bcrypt";




const userController = {
  index: async (req, res) => {
    const user = await userServices.getUser({
      uuid: req.session.uuid,
    });
    res.render("index", { user });
  },
  detailProfile: async (req, res) => {
    const user = await userServices.getUser({
      uuid: req.session.uuid,
    });
    res.render("detail-profile", { user: user[0] });
  },

  display: async (req, res) => {
    const datas = await prisma.media.findMany({
      where: {
        receiverId: req.params.uuid,
        played: false,
      },
    });

    if (datas.length > 0) {
      setTimeout(async () => {
        await prisma.media.update({
          where: {
            id: datas[0].id,
            receiverId: req.params.uuid,
          },
          data: {
            played: true,
          },
        });
      }, datas[0].duration);
    }
    res.render("display", { datas });
  },

  registerForm: (req, res) => {
    res.render("form/register");
  },
  loginForm: (req, res) => {
    if (req.session.logged) {
      return res.redirect("/");
    }
    res.render("form/login");
  },

  register: async (req, res) => {
    try {
      await userServices.register(req.body);
      req.flash("success", "register successfully");
      res.redirect("/form/login");
    } catch (error) {
      throw error;
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const credential = await userServices.getUser({
        email,
      });

      if (credential.length === 1) {
        credential.forEach(async (e) => {
          // compare password
          const checkPassword = await bcrypt.compare(password, e.password);
          if (!checkPassword) {
            req.flash("failure", "password not match");
            res.redirect("back");
          }
          req.session.name = e.name;
          req.session.logged = true;
          req.session.uuid = e.uuid;
          req.flash("success", "berhasil login");

          res.redirect("/index");
        });
      } else {
        req.flash("failure", "credential not found");
        res.redirect("back");
      }
    } catch (error) {
      throw error;
    }
  },
  logout: (req, res) => {
    req.session.logged = false;
    res.redirect("/form/login");
  },

  updateProfile: (req, res) => {
    const { name, email } = req.body;
    const images = req.file.filename;
    userServices.updateUser(
      { uuid: req.session.uuid },
      { email, name, images }
    );
    res.redirect("back");
  },
};
export { userController };
