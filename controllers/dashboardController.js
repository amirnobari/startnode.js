let controller = require("./controller");
const User = require("models/user");

const { validationResult } = require("express-validator");

module.exports = new class dashboardController extends controller {
  async index(req, res, next) {
    //console.log(req.flash('errors'))
    try {
     res.render('dashboard/indexlogout')
     
      }
    catch (err) {
      next(err);
    }
  }
}
  
