const validator = require("./validator");
const { check } = require("express-validator");

module.exports = new class UserValidator extends validator {
  register() {
    return [
       // username must be an name
       check("name", "نام کاربری وارد نشده است").not().isEmpty(),
      // username must be an email
      check("email", "فرمت ایمیل صحیح نیست").isEmail(),
      // password must be at least 5 chars long
      check("password", "طول پسورد بایستی بیشتر از 5 کاراکتر باشد").isLength({
        min: 5,
      }),
    ];
  }

  login() {
    return [
      // username must be an email
      check("email", "فرمت ایمیل صحیح نیست").isEmail(),
      // password must be at least 5 chars long
      check("password", "طول پسورد بایستی بیشتر از 5 کاراکتر باشد").isLength({
        min: 5,
      }),
    ];
  }

};
