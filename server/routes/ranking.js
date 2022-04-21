var express = require("express");
var router = express.Router();
const { Ranking, User, Game } = require("../models");

router.post("/", async (req, res, next) => {
  const { rankingDB, address, owner } = req.body;
  const reward = [1000, 600, 400];

  const findUser = await User.findOne({
    where: { address: owner },
    attributes: ["address", "weeks"],
  });

  const checkApprove = await Game.findAll({
    where: { address: address },
    attributes: ["approve"],
  });

  const result = await checkApprove.filter((data) => {
    return data.approve === false;
  });

  try {
    if (result.length === 0) {
      await rankingDB.mineranker
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

      await rankingDB.snakeranker
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

      await rankingDB.puzzleranker
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

      await rankingDB.tetrisranker
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
        )
          .then(async () => {
            await Game.update(
              {
                snakePoint: null,
                puzzlePoint: null,
                tetrisPoint: null,
                snakePoint: null,
                approve: false,
              },
              { where: {} }
            );
          })
          .then(async () => {
            const totalclaim = await Ranking.findAll({
              where: { claim: false },
              attributes: ["balance"],
            });
            const newDate = new Date().getTime() + 604800000;
            await User.update(
              { count: newDate.toString() },
              { where: { address: owner } }
            );
            res.json({
              message: "ok",
              totalclaim: totalclaim,
              count: newDate.toString(),
            });
          });
      }
    } else {
      res.json({ message: "no" });
    }
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

router.post("/sendbalance", async (req, res) => {
  const totalclaim = await Ranking.findAll({
    where: { claim: true },
    attributes: ["balance"],
  });
  res.json({ totalclaim: totalclaim });
});

router.post("/updateclaim", async (req, res) => {
  const address = req.body.address;
  await Ranking.update({ claim: true }, { where: { address: address } }).then(
    () => {
      res.json({ message: "ok" });
    }
  );
});

module.exports = router;
