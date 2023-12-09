import { Prisma } from "@prisma/client";
import ErrorException from "../error/ErrorException.js";

const errorMidleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    req.flash("failure", err.message);
    res.redirect("back");
    throw err.message;
  } else if (err instanceof ErrorException) {
    req.flash("failure", err.message);
    res.redirect("back");
    throw err.message;
  } else {
    req.flash("failure", err.message);
    res.redirect("back");
    throw err.message;
  }
};

export default errorMidleware;
