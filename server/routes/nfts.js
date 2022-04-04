var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const User = require("../models/user");
const DB = require("../models");
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

router.post("/countoflike", async (req, res, next) => {
  const count = await Likes.findAll({ where: { tokenId: req.body.tokenId } });
  res.json({ count: count.length });
});

module.exports = router;
