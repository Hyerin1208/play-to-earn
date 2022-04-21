var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const User = require("../models/user");
const History = require("../models/history");
const DB = require("../models");
const Likes = DB.sequelize.models.Likes;

router.post("/", async (req, res, next) => {
  const nft = await Nfts.findOne({
    where: { tokenId: req.body.tokenId },
  });
  if (!nft) {
    Nfts.create({
      tokenId: req.body.tokenId,
      address: req.body.address,
      img: req.body.img,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    }).then(() => {
      History.create({
        tokenId: req.body.tokenId,
        from: req.body.contractAddress,
        to: req.body.address,
      });
      res.json({ message: "ok" });
    });
  } else {
    res.json({
      address: nft.address,
      img: nft.img,
      name: nft.name,
      description: nft.description,
      price: nft.price,
      rare: nft.rare,
      star: nft.star,
      likes: nft.likes,
      views: nft.views,
    });
  }
});

router.post("/upgrade", async (req, res, next) => {
  try {
    await Nfts.update(
      { rare: req.body.rare, star: req.body.star },
      { where: { tokenId: req.body.tokenId } }
    );
    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/like", async (req, res, next) => {
  if (req.body.account === null) {
    res.json({ message: "fail" });
  } else {
    const nft = await Nfts.findOne({
      where: { tokenId: req.body.tokenId },
    });
    const user = await User.findOne({ where: { address: req.body.account } });

    const getlike = await Likes.findOne({
      where: { address: req.body.account },
    });

    if (getlike === null) {
      await nft.addLiker(user);
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
  if (req.body.account === null) {
    res.json({ message: "fail" });
    return res.status(404).send("Connect your account");
  } else {
    const likes = await Likes.findAll({
      where: { address: req.body.account },
    });
    res.json({ like: likes.length });
  }
});

router.post("/views", async (req, res, next) => {
  try {
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
