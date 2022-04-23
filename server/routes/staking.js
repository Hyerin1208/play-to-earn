var express = require("express");
var router = express.Router();
const { Ranking, User, Game, Staking } = require("../models");

router.post("/", async (req, res, next) => {
  const { stakerId, address, amount } = req.body;
  const checkuser = await User.findOne({
    where: { address: address },
  });
  if (checkuser) {
    const checkstaking = await Staking.findOne({
      where: { address: address },
    });
    if (checkstaking) {
      await Staking.update(
        { amount: amount },
        { where: { address: address } }
      ).then(() => {
        res.json({ message: "update" });
      });
    } else {
      await Staking.create({
        stakerId: stakerId,
        address: address,
        amount: amount,
      }).then(() => {
        res.json({ message: "create" });
      });
    }
  } else {
    res.json({ message: "not user" });
  }
});

router.post("/amount", async (req, res, next) => {
  const { address } = req.body;
  const checkuser = await User.findOne({
    where: { address: address },
  });
  if (checkuser) {
    const checkstaking = await Staking.findOne({
      where: { address: address },
    });
    if (checkstaking) {
      res.json({
        amount: checkstaking.amount,
        stakerId: checkstaking.stakerId,
      });
    } else {
      console.log("여기2");
      res.json({ amount: 0, stakerId: null });
    }
  } else {
    res.json({ amount: 0, stakerId: null });
  }
});
router.post("/rewards", async (req, res, next) => {
  const checkstaking = await Staking.findAll({
    where: {},
    attributes: ["stakerId"],
  });
  res.json({ checkstaking: checkstaking });
});

module.exports = router;
