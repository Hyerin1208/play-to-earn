const { text } = require("body-parser");
var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const History = require("../models/history");
const DB = require("../models");

router.post("/", async (req, res, next) => {
  await History.create({
    tokenId: req.body.tokenId,
    from: req.body.from,
    to: req.body.to,
  })
    .then(async () => {
      await Nfts.update(
        { address: req.body.to },
        { where: { tokenId: req.body.tokenId } }
      ).then(() => {
        res.json({ message: "ok" });
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.post("/info", async (req, res, next) => {
  try {
    if (req.body.tokenId === null) {
      res.json({ message: "fail" });
      return res.status(404).send("Connect your account");
    } else {
      const info = await History.findAll({
        where: {
          tokenId: req.body.tokenId,
        },
      });
      res.json(info);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
