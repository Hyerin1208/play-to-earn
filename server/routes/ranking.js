var express = require("express");
var router = express.Router();
const { Ranking, User } = require("../models");

router.post("/", async (req, res, next) => {
  const { rankingDB, address } = req.body;
  const reward = [1000, 600, 400];

  const findUser = await User.findOne({
    where: { address: address },
    attributes: ["address", "weeks"],
  });

  try {
    rankingDB.mineranker
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: findUser.weeks,
          games: "mineGame",
          rank: index + 1,
          address: data.address,
          nick: data.nick,
          balance: reward[index],
        });
      });
    rankingDB.snakeranker
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: findUser.weeks,
          games: "snakeGame",
          rank: index + 1,
          address: data.address,
          nick: data.nick,
          balance: reward[index],
        });
      });
    rankingDB.puzzleranker
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: findUser.weeks,
          games: "2048Game",
          rank: index + 1,
          address: data.address,
          nick: data.nick,
          balance: reward[index],
        });
      });
    rankingDB.tetrisranker
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: findUser.weeks,
          games: "tetrisGame",
          rank: index + 1,
          address: data.address,
          nick: data.nick,
          balance: reward[index],
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

router.post("/previous", async (req, res) => {
  const previousRank = await Ranking.findAll();
  res.json(previousRank);
});

module.exports = router;
