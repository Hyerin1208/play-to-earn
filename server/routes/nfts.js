const { text } = require("body-parser");
var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const User = require("../models/user");

router.post("/", async (req, res, next) => {
  const nft = await Nfts.findOne({
    where: { tokenId: req.body.tokenId },
  });
  console.log(req.body.tokenId);
  if (!nft) {
    Nfts.create({ tokenId: req.body.tokenId });
    res.json({ message: "ok" });
  } else {
    res.json({ message: "no" });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const nft = await Nfts.findOne({
      include: {
        model: User,
        attributes: ["id", "address"],
      },
      where: { tokenId: req.body.tokenId },
    });
    await Nfts.update(
      { views: nft.views + 1 },
      { where: { id: `${req.body.tokenId}` } }
    );
    res.json({ message: "update ok" });
    console.log(req.body.tokenId);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
