const express = require("express");
const app = express();
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require('passport');
const MongoStore = require("connect-mongo");

require("app-module-path").addPath(__dirname);
mongoose.set('strictQuery', true);
mongoose
  .connect(`mongodb://${ process.env.MONGO_HOSTNAME }:${ process.env.MONGO_PORT }/${ process.env.MONGO_INITDB_USERNAME }`, {
    user: process.env.MONGO_INITDB_USERNAME,
    pass: process.env.MONGO_INITDB_PASSWORD,
    dbName: process.env.MONGO_INITDB_DATABASE,
    retryWrites: true,
    authSource: process.env.MONGO_INITDB_DATABASE,
    authMechanism: "SCRAM-SHA-256",
    auth: { username: process.env.MONGO_INITDB_USERNAME, password: process.env.MONGO_INITDB_PASSWORD }
  })
  .then(() => console.log("Connected to server!"));
 
global.config = require("./config");
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("method"));
app.use(cookieParser(process.env.cookie_secret));

//console.log(process.env.session_secret);
app.use(
  session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 7) }, secure: true,
    store: MongoStore.create({
      mongoUrl: `mongodb://${ process.env.MONGO_INITDB_USERNAME }:${ process.env.MONGO_INITDB_PASSWORD }@${ process.env.MONGO_HOSTNAME }:${ process.env.MONGO_PORT }/${ process.env.MONGO_INITDB_DATABASE }?retryWrites=true`
    }),
  })
);

require('./passport/passport-local');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals = { errors: req.flash("errors"), req };
  next();
});

app.use("/", require("./routes/index"));

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
  console.log("server is runnig on port :" + config.port);
});
