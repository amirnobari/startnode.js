const express = require("express");
const app = express();
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");

require('app-module-path').addPath(__dirname);

require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/firstnode")
  .then(() => console.log("Connected to server!"));

global.config = require("./config");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("method"));
app.use(flash());
app.use(cookieParser(process.env.cookie_secret));
//console.log(process.env.session_secret);
app.use(
  session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", require("./routes/index"));

app.listen(config.port, () => {
  console.log("server is runnig on port :" + config.port);
});
