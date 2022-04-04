var express = require("express");
var router = express.Router();
const { Game, User } = require("../models");

// router.post 모음
// SnakeGame
router.post("/snake", async (req, res, next) => {
  const { point, account } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        snakePoint: point,
      });
    } else {
      Game.update(
        { snakePoint: point, nick: findUser.nick },
        { where: { address: account } }
      );
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 2048Game
router.post("/2048", async (req, res, next) => {
  const { score, account } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        puzzlePoint: score,
      });
    } else {
      Game.update(
        { puzzlePoint: score, nick: findUser.nick },
        { where: { address: account } }
      );
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// MineGame
router.post("/mine", async (req, res, next) => {
  const { runtime, account } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        minePoint: runtime,
      });
    } else {
      Game.update(
        { minePoint: runtime, nick: findUser.nick },
        { where: { address: account } }
      );
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// TetrisGame
router.post("/tetris", async (req, res, next) => {
  const { data, account } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        tetrisPoint: data,
      });
    } else {
      Game.update(
        { tetrisPoint: data, nick: findUser.nick },
        { where: { address: account } }
      );
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get 모음
// SnakeGame
router.get("/snake", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "snakePoint", "address"],
    order: [["snakePoint", "desc"]],
  });
  const snake = [];

  for (const user of users) {
    snake.push({
      nick: user.nick,
      address: user.address,
      snakePoint: user.snakePoint,
    });
  }

  res.json(snake);
});

// 2048Game
router.get("/2048", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "puzzlePoint", "address"],
    order: [["puzzlePoint", "desc"]],
  });
  const puzzle = [];

  for (const user of users) {
    puzzle.push({
      nick: user.nick,
      address: user.address,
      puzzlePoint: user.puzzlePoint,
    });
  }

  res.json(puzzle);
});

// MineGame
router.get("/mine", async (req, res) => {
  const users = await Game.findAll({
    // where: {
    //   minePoint: { [Op.ne]: null },
    // },
    attributes: ["nick", "minePoint", "address"],
    order: [["minePoint", "asc"]],
  });
  const mine = [];

  for (const user of users) {
    mine.push({
      nick: user.nick,
      address: user.address,
      minePoint: user.minePoint,
    });
  }

  res.json(mine);
});

// TetrisGame
router.get("/tetris", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "tetrisPoint", "address"],
    order: [["tetrisPoint", "desc"]],
  });
  const tetris = [];

  for (const user of users) {
    tetris.push({
      nick: user.nick,
      address: user.address,
      tetrisPoint: user.tetrisPoint,
    });
  }

  res.json(tetris);
});

module.exports = router;
