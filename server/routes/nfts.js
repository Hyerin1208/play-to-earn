const { text } = require("body-parser");
var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const User = require("../models/user");
const DB = require("../models");
const db = require("../models");
const Likes = DB.sequelize.models.Likes;

router.post("/", async (req, res, next) => {
  const nft = await Nfts.findOne({
    where: { tokenId: req.body.tokenId },
  });
  if (!nft) {
    Nfts.create({ tokenId: req.body.tokenId });
    res.json({ message: "ok" });
  } else {
    res.json({ message: "no" });
  }
});

router.post("/like", async (req, res, next) => {
  console.log(req.body.account);
  if (req.body.account === null) {
    res.json({ message: "fail" });
  } else {
    const nft = await Nfts.findOne({
      where: { tokenId: req.body.tokenId },
    });
    const user = await User.findOne({ where: { address: req.body.account } });
    console.log(nft);
    console.log(user);

    const getlike = await Likes.findOne({
      where: { address: req.body.account },
    });

    console.log(getlike);

    if (getlike === null) {
      await nft.addLiker(user);
      console.log("여기???");
      await Nfts.update(
        { likes: nft.likes + 1 },
        {
          where: { tokenId: req.body.tokenId },
        }
      );
      res.json({ message: "ok" });
    } else {
      await nft.removeLiker(user);
      await Nfts.update(
        { likes: nft.likes - 1 },
        {
          where: { tokenId: req.body.tokenId },
        }
      );
      res.json({ message: "no" });
    }
  }
});

// total 좋아요 수
router.post("/likes", async (req, res, next) => {
  console.log(req.body.account);
  if (req.body.account === null) {
    res.json({ message: "fail" });
    return res.status(404).send("Connect your account");
  } else {
    const likes = await Likes.findAll({
      where: { address: req.body.account },
    });
    console.log(likes.length);
    res.json({ like: likes.length });
  }
});

router.post("/views", async (req, res, next) => {
  try {
    console.log(req.body.tokenId);
    const nft = await Nfts.findOne({
      where: { tokenId: req.body.tokenId },
    });
    await Nfts.update(
      { views: nft.views + 1 },
      { where: { tokenId: req.body.tokenId } }
    );
    res.json({ view: nft.views + 1 });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/countoflike", async (req, res, next) => {
  const count = await Likes.findAll({ where: { tokenId: req.body.tokenId } });
  res.json({ count: count.length });
});

module.exports = router;
