var express = require("express");
var router = express.Router();
const { Nfts } = require("../models");

router.post("/", async (req, res, next) => {
  const { userId, tokenId } = req.body;

  try {
    const hate = await Nfts.findOne({
      where: { userId: userId, tokenId: tokenId },
    });
    if (!hate) {
      Nfts.create({
        userId: userId,
        tokenId: tokenId,
      });
    } else {
      Nfts.destroy({
        userId: userId,
        tokenId: tokenId,
      });
    }
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
