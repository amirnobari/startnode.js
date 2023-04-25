let controller = require("./controller");
const User = require("models/user");
const passport = require("passport");
const Recaptcha = require('express-recaptcha').RecaptchaV2
const options = { hl: 'fa' };
const recaptcha = new Recaptcha('6LfG2swkAAAAAAL7Q8nJjllFJEPCodRCGYQOJAcW', '6LfG2swkAAAAAEWhmF50JBzEz01isFOk6rwi-ZjE', options);
const { validationResult } = require("express-validator");
const { Promise } = require("mongoose");

class UserController extends controller {
    async registerform(req, res, next) {
        try {
            res.render("auth/register", { recaptcha: recaptcha.render() });
        } catch (err) {
                        next(err);
        }
    }

    async loginform(req, res, next) {
        try {
            res.render("auth/login", { recaptcha: recaptcha.render() });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
           // let recaptchaResult = await new Promise((resolve, reject) => {
              //  recaptcha.verify(req, (err, data) => {
                  //  if (err) {
                    //    req.flash('errors', 'تیک امنیتی را بزنید');
                    //    res.redirect('/auth/login');
                     //   resolve(false)
                //    } else {
                  //      resolve(true)
                //    }
             //   })
          //  })
         //   if (!recaptchaResult) {
           //     return;
          //  }


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
            })(req, res, next)
        } catch (err) {
            next(err);
        }
    }

    async register(req, res, next) {
        try {
          //  let recaptchaResult = await new Promise((resolve,reject) => {
                //recaptcha.verify(req, (err, data) => {
                  //  if (err) {
                    //    req.flash('errors', 'تیک امنیتی را بزنید');
                     //   res.redirect('/auth/register');
                     //   resolve(false)
                   // } else {
                   //     resolve(true)
                  //  }
               // })
           // })
          //  if (!recaptchaResult) {
            //    return;
                
          //  }
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
