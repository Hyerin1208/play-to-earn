var express = require("express");
var router = express.Router();
const { Ranking, User } = require("../models");

router.post("/", async (req, res, next) => {
  const { snakeAddress, tetrisAddress, puzzleAddress, mineAddress } = req.body;

  try {
    snakeAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks + 1,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    tetrisAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks + 1,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    puzzleAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks + 1,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });
    mineAddress
      .filter((v, i) => {
        return i < 3;
      })
      .map((data, index) => {
        Ranking.create({
          weeks: data.weeks + 1,
          games: data.games,
          rank: data.rank,
          address: data.address,
          balance: data.balance[index],
        });
      });

    res.json({ message: "Ranking Send success!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/weeks", async (req, res) => {
  const users = await Ranking.findAll({
    attributes: ["weeks"],
    limit: 1,
  });
  console.log("u", users);
  try {
    const round = [{ weeks: users }];
    res.json(round);
  } catch (err) {
    console.error(err);
    return next(err);
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
