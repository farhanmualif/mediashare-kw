import { Prisma } from "@prisma/client";
import ErrorException from "../src/error/ErrorException.js";

const errorMidleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    req.flash("failure", err.message);
    res.redirect("back");
  } else if (err instanceof ErrorException) {
    req.flash("failure", err.message);
    res.redirect("back");
  } else {
    req.flash("failure", err.message);
    console.log("terjadi error");
  }
};

export default errorMidleware;
