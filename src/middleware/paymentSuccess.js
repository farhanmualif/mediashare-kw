export const paymentSuccess = (req, res, next) => {
  console.log("from middleware: ", req.session.paymentSuccess)
  if (!req.session.paymentSuccess) {
    res.redirect("/");
  }
  next();
};
