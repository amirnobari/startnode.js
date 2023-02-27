let controller = require("./controller");
const User = require("models/user");
const passport = require("passport");
const { validationResult } = require("express-validator");

class UserController extends controller {
  async registerform(req, res, next) {
    try {
      res.render("auth/register");
    } catch (err) {
      next(err);
    }
  }

  async loginform(req, res, next) {
    try {
      res.render("auth/login");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/auth/login");
      }
      passport.authenticate("local.login", (err, user) => {
        if (!user) return res.redirect("/auth/login");
        req.logIn(user, err => {
          return res.redirect("/dashboard")
        
               })
      })(req,res,next)
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/auth/register");
      }
      passport.authenticate("local.register", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/register",
        failureFlash: "true",
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
