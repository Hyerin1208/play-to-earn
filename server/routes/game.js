var express = require("express");
var router = express.Router();
const { Game } = require("../models");

// router.post 모음
// SnakeGame
router.post("/snake", async (req, res, next) => {
  const { point, account } = req.body;

  try {
    Game.create({
      snakePoint: point,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 2048Game
router.post("/2048", async (req, res, next) => {
  const { score, account } = req.body;

  try {
    Game.create({
      puzzlePoint: score,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// MineGame
router.post("/mine", async (req, res, next) => {
  const { runtime, account } = req.body;

  try {
    Game.create({
      minePoint: runtime,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// TetrisGame
router.post("/tetris", async (req, res, next) => {
  const { data, account } = req.body;

  try {
    Game.create({
      tetrisPoint: data,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get 모음
// SnakeGame
router.get("/snake", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "snakePoint"],
    order: [["snakePoint", "desc"]],
  });
  const snake = [];

  for (const user of users) {
    snake.push({
      nick: user.nick,
      snakePoint: user.snakePoint,
    });
  }

  res.json(snake);
});

// 2048Game
router.get("/2048", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "puzzlePoint"],
    order: [["puzzlePoint", "desc"]],
  });
  const puzzle = [];

  for (const user of users) {
    puzzle.push({
      nick: user.nick,
      puzzlePoint: user.puzzlePoint,
    });
  }

  res.json(puzzle);
});

// MineGame
router.get("/mine", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "minePoint"],
    order: [["minePoint", "asc"]],
  });
  const mine = [];

  for (const user of users) {
    mine.push({
      nick: user.nick,
      minePoint: user.minePoint,
    });
  }

  res.json(mine);
});

// TetrisGame
router.get("/tetris", async (req, res) => {
  const users = await Game.findAll({
    attributes: ["nick", "tetrisPoint"],
    order: [["tetrisPoint", "desc"]],
  });
  const tetris = [];

  for (const user of users) {
    tetris.push({
      nick: user.nick,
      tetrisPoint: user.tetrisPoint,
    });
  }

  res.json(tetris);
});

// router.put 모음
// SnakeGame
router.put("/snake", async (req, res, next) => {
  const { point, account } = req.body;

  try {
    Game.update(
      {
        snakePoint: point,
      },
      { where: { address: account } }
    );
    return res.json({ message: "sucess" });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

// 2048Game
router.put("/2048", async (req, res, next) => {
  const { score, account } = req.body;

  try {
    Game.update(
      {
        puzzlePoint: score,
      },
      { where: { address: account } }
    );
    return res.json({ message: "sucess" });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

// MineGame
router.put("/mine", async (req, res, next) => {
  const { runtime, account } = req.body;

  try {
    Game.update(
      {
        minePoint: runtime,
      },
      { where: { address: account } }
    );
    return res.json({ message: "sucess" });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

// TetrisGame
router.put("/tetris", async (req, res, next) => {
  const { data, account } = req.body;

  try {
    Game.update(
      {
        tetrisPoint: data,
      },
      { where: { address: account } }
    );
    return res.json({ message: "sucess" });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

module.exports = router;
