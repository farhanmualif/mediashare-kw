import { Prisma } from "@prisma/client";
import ValidationError from "joi";
import ErrorException from "../src/error/ErrorException.js";

const errorMidleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  console.log("dari middleware");

  if (err instanceof Prisma.PrismaClientValidationError) {
    req.flash("failure", err.message);
    res.redirect("back");
  } else if (err instanceof ErrorException) {
    req.flash("failure", err.message);
    res.redirect("back");
  }
};

export default errorMidleware;
