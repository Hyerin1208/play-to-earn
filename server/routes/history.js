const { text } = require("body-parser");
var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const History = require("../models/history");
const DB = require("../models");

router.post("/", async (req, res, next) => {
  console.log(req.body.tokenId);
  console.log(req.body.from);
  console.log(req.body.to);

  await History.create({
    tokneId: req.body.tokenId,
    from: req.body.from,
    to: req.body.to,
  });
  // .then(() => {
  res.json({ message: "ok" });
  // })
  // .catch((err) => {
  //   res.json({ message: "no" });
  // });
});

module.exports = router;
