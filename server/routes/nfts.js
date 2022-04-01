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

    const getlike = await Likes.findOne({
      where: { address: req.body.account },
    });

    if (!getlike) {
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

    // const nft = await Nfts.findOne({
    //   where: { tokenId: req.body.tokenId },
    // });
    // const user = await User.findOne({ where: { address: req.body.account } });

    // await nft.addLiker(user);

    // const nfts = await Nfts.findOne({
    //   where: { tokenId: req.body.tokenId },
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["id", "address"],
    //       as: "Liker",
    //     },
    //   ],
    // });

    // res.json({ message: "ok" });
  }
});

router.post("/countoflike", async (req, res, next) => {
  const count = await Likes.findAll({ where: { tokenId: req.body.tokenId } });
  res.json({ count: count.length });
});

module.exports = router;
