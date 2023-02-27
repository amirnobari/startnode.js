let controller = require("./controller");
const User = require("models/user");

const { validationResult } = require("express-validator");

class UserController extends controller {
  async getAllUsers(req, res, next) {
    //console.log(req.flash('errors'))
    try {
      let users = await User.find({});
      res.render("users", {
        users: users,
        title: "all users",
        errors: req.flash("errors"),
        message: req.flash("message"),
      });
    } catch (err) {
      next(err);
    }
  }

  async seeOneUser(req, res, next) {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
      }
      res.render("user", { user: user });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/user");
      }
      req.body.id = parseInt(req.body.id);
      let newUser = new User({
        name: req.body.name,
       
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      // users.push(req.body);
      req.flash("massage", "کاربر جدید با موفقیت ثبت شد!");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      await User.updateMany({ _id: req.params.id }, { $set: req.body });
      req.flash("message", "کاربر جدید با موفقیت بروزرسانی شد!");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await User.deleteMany({ _id: req.params.id });
      req.flash("message", "کاربر مورد نظر با موفقیت حذف شد!");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
