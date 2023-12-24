import { Prisma } from "@prisma/client";
import ErrorException from "../error/ErrorException.js";

const errorMidleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    console.log(err);
    req.flash("failure", err.message);
    res.redirect("back");
    throw err.message;
  } else if (err instanceof ErrorException) {
    console.log(err);

    req.flash("failure", err.message);
    res.redirect("back");
    throw err.message;
  } else {
    console.log(err);
    req.flash("failure", err.message);
    res.redirect("back");
    throw err.message;
  }
};

export default errorMidleware;
