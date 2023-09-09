import { Prisma } from "@prisma/client";

const errorMidleware = (err, req, res, next) => {
  if (!err) {
    next();
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    
  }
  return next(err);
};

export default errorMidleware;
