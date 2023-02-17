const express = require("express");
const router = express.Router();

const User = require("models/user");
const { check, validationResult } = require("express-validator");

//controllers
const userController = require("controllers/userController");
//validators
const userValidator = require("validators/userValidator");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.seeOneUser);
router.post("/", userValidator.handle(), userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
