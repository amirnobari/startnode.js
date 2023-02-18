let controller = require("./controller");
const User = require("models/user");

const { validationResult } = require("express-validator");
const { render } = require("ejs");

class UserController extends controller {
  async registerform(req, res, next) {
    try {
res.render('auth/register')

    } catch (err) {
      next(err);
    }
  }

  async loginform(req, res, next) {
    try {
res.render('auth/login')

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
          console.log("login");
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
      console.log("register");
    } catch (err) {
      next(err);
    }
  }


  async mainpage(req, res, next) {
    try {
res.render('auth/mainpage')

    } catch (err) {
      next(err);
    }
  }

  async discounted(req,res,next){
    try {
      res.render('auth/discounted')
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
