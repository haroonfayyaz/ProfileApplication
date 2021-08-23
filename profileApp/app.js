var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var friendsRouter = require("./routes/friends.routes");


var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/*", indexRouter);


module.exports = app;