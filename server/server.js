var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

const { sequelize } = require("./models");

var mainRouter = require("./routes/main");
var userRouter = require("./routes/user");
var gameRouter = require("./routes/game");
var nftsRouter = require("./routes/nfts");
var rankingRouter = require("./routes/ranking");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB 연결성공");
    })
    .catch((err) => {
        console.error(`DB 연결실패 - ${err}`);
    });

app.use("/main", mainRouter);
app.use("/user", userRouter);
app.use("/game", gameRouter);
app.use("/nfts", nftsRouter);
app.use("/ranking", rankingRouter);

module.exports = app;
