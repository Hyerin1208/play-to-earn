var express = require("express");
var router = express.Router();
const { Ranking, User } = require("../models");

router.post("/", async (req, res, next) => {
  const { snakeAddress, tetrisAddress, puzzleAddress, mineAddress, claim } =
    req.body;

  try {
    snakeAddress
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
    tetrisAddress
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
    puzzleAddress
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
    mineAddress
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

    // const findAddress = await Ranking.findOne({ where: { address: account } });
    // const findUser = await User.findOne({
    //   where: { address: account },
    //   attributes: ["address", "games", "rank", "claim"],
    // });

    // if (findAddress) {
    //   Ranking.update(
    //     { claim: findUser.claim },
    //     { where: { address: account, games: games, rank: rank } }
    //   );
    // }

    res.json({ message: "Ranking Send success!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/", async (req, res) => {
  const users = await Ranking.findAll({
    attributes: ["weeks"],
    order: [["weeks", "desc"]],
    limit: 12,
  });
  const count = [];

  for (const user of users) {
    count.push({
      weeks: user.weeks,
    });
  }

  res.json(count);
  console.log(count);
});

module.exports = router;