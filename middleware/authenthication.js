export const authentication = (req, res, next) => {
  if (!req.session.logged) {
    return res.redirect("/");
  }
  next();
};

