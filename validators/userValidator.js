const validator = require("./validator");
const { check } = require("express-validator");


module.exports = new class UserValidator extends validator {
  handle() {
    return [
      // username must be an email
      check("email", "فرمت ایمیل صحیح نیست").isEmail(),
      // password must be at least 5 chars long
      check("password", "طول پسورد بایستی بیشتر از 5 کاراکتر باشد").isLength({
        min: 5,
      }),
    ]
  }
};
