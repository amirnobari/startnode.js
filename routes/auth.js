const express = require("express");
const router = express.Router();


//controllers
const authController = require("controllers/authController");
//validators
const authValidator = require("validators/authValidator");

router.get("/login", authController.loginform);
router.get("/register", authController.registerform);
router.get("/mainpage", authController.mainpage);
router.get("/discounted", authController.discounted);


router.post("/login", authController.login);
router.post("/register", authController.register);


module.exports = router;
