var express = require("express");
var router = express.Router();
const { Ranking, User } = require("../models");

router.post("/reward", async (req, res, next) => {
  const { snakeRank, tetrisRank, puzzleRank, mineRank, address } = req.body;
  const findUser = await User.findOne({
    where: { address: address },
    attributes: ["address", "weeks"],
  });

  try {
    snakeRank
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    tetrisRank
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    puzzleRank
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    mineRank
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    if (findUser) {
      User.update(
        { weeks: findUser.weeks + 1 },
        { where: { address: address } }
      );
    }

    res.json({ message: "Ranking Send success!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/balance", async (req, res) => {
  const { address } = req.body;
  const users = await Ranking.findAll({
    where: { address: address },
    attributes: ["address", "balance"],
  });
  const balance = [];

  for (const user of users) {
    balance.push({
      balance: user.balance,
      address: user.address,
    });
  }
  res.json(balance);
});

module.exports = router;
