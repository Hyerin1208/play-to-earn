var express = require("express");
var router = express.Router();
const { Game, User, Ranking } = require("../models");
const { Op } = require("sequelize");

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
    const prevScore = await Game.findOne({
      where: { address: account },
      attributes: ["snakePoint"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        snakePoint: point,
      });
      res.json({ message: "점수 등록 완료", bool: true });
    } else {
      if (prevScore.snakePoint === null) {
        Game.update(
          { snakePoint: point, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 등록 완료", bool: true });
      } else if (point > prevScore.snakePoint) {
        Game.update(
          { snakePoint: point, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 갱신 완료", bool: true });
      } else {
        res.json({ message: "이전 점수보다 낮거나 같습니다.", bool: false });
      }
    }
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
    const prevScore = await Game.findOne({
      where: { address: account },
      attributes: ["puzzlePoint"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        puzzlePoint: score,
      });
      res.json({ message: "점수 등록 완료", bool: true });
    } else {
      if (prevScore.puzzlePoint === null) {
        Game.update(
          { puzzlePoint: score, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 등록 완료", bool: true });
      } else if (score > prevScore.puzzlePoint) {
        Game.update(
          { puzzlePoint: score, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 갱신 완료", bool: true });
      } else {
        res.json({ message: "이전 점수보다 낮거나 같습니다.", bool: false });
      }
    }
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
    const prevScore = await Game.findOne({
      where: { address: account },
      attributes: ["minePoint"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        minePoint: runtime,
      });
      res.json({ message: "점수 등록 완료", bool: true });
    } else {
      if (prevScore.minePoint === null) {
        Game.update(
          { minePoint: runtime, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 등록 완료", bool: true });
      } else if (runtime > prevScore.minePoint) {
        Game.update(
          { minePoint: runtime, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 갱신 완료", bool: true });
      } else {
        res.json({ message: "이전 점수보다 낮거나 같습니다.", bool: false });
      }
    }
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
    const prevScore = await Game.findOne({
      where: { address: account },
      attributes: ["tetrisPoint"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        tetrisPoint: data,
      });
      res.json({ message: "점수 등록 완료", bool: true });
    } else {
      if (prevScore.tetrisPoint === null) {
        Game.update(
          { tetrisPoint: data, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 등록 완료", bool: true });
      } else if (data > prevScore.tetrisPoint) {
        Game.update(
          { tetrisPoint: data, nick: findUser.nick },
          { where: { address: account } }
        );
        res.json({ message: "점수 갱신 완료", bool: true });
      } else {
        res.json({ message: "이전 점수보다 낮거나 같습니다.", bool: false });
      }
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get 모음

// SnakeGame
router.post("/ranking", async (req, res) => {
  const address = req.body.address;
  const snake = await Game.findAll({
    where: { snakePoint: { [Op.not]: null } },
    attributes: ["nick", "snakePoint", "address", "approve"],
    order: [["snakePoint", "desc"]],
  });

  const snakeranker = await snake.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.snakePoint,
        approve: data.approve,
      };
      return form;
    }
  });

  const snakeMyRanking = snake.findIndex((element) => {
    if (element.address === address) {
      return true;
    }
  });

  const puzzle = await Game.findAll({
    where: { puzzlePoint: { [Op.not]: null } },
    attributes: ["nick", "puzzlePoint", "address", "approve"],
    order: [["puzzlePoint", "desc"]],
  });

  const puzzleranker = await puzzle.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.puzzlePoint,
        approve: data.approve,
      };
      return form;
    }
  });

  const puzzleMyRanking = puzzle.findIndex((element) => {
    if (element.address === address) {
      return true;
    }
  });

  const mine = await Game.findAll({
    where: { minePoint: { [Op.not]: null } },
    attributes: ["nick", "minePoint", "address", "approve"],
    order: [["minePoint", "ASC"]],
  });

  const mineranker = await mine.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.minePoint,
        approve: data.approve,
      };
      return form;
    }
  });

  const mineMyRanking = mine.findIndex((element) => {
    if (element.address === address) {
      return true;
    }
  });

  const tetris = await Game.findAll({
    where: { tetrisPoint: { [Op.not]: null } },
    attributes: ["nick", "tetrisPoint", "address", "approve"],
    order: [["tetrisPoint", "desc"]],
  });

  const tetrisranker = await tetris.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.tetrisPoint,
        approve: data.approve,
      };
      return form;
    }
  });
  const tetrisMyRanking = tetris.findIndex((element) => {
    if (element.address === address) {
      return true;
    }
  });

  res.json({
    snakeranker: snakeranker,
    snakeMyRanking: snakeMyRanking + 1,
    puzzleranker: puzzleranker,
    puzzleMyRanking: puzzleMyRanking + 1,
    mineranker: mineranker,
    mineMyRanking: mineMyRanking + 1,
    tetrisranker: tetrisranker,
    tetrisMyRanking: tetrisMyRanking + 1,
  });
});

// RankingDB
router.post("/weekly", async (req, res) => {
  const findUser = await User.findOne({
    where: { id: 1 },
    attributes: ["weeks"],
  });

  const testArray = [];
  for (let i = 1; i < findUser.weeks; i++) {
    const RankingDB = await Ranking.findAll({
      where: { weeks: i },
    });
    testArray.push(await RankingDB);
  }
  res.json(testArray);
});

router.post("/setclaim", async (req, res, next) => {
  await Game.update(
    { approve: req.body.claim },
    { where: { address: req.body.address } }
  ).then(() => {
    res.json({ message: "ok" });
  });
});

router.post("/getclaim", async (req, res, next) => {
  const result = await Game.findOne({ where: { address: req.body.address } });
  res.json({ message: result.approve });
});

router.post("/puzzleScore", async (req, res, next) => {
  const { account } = req.body;
  const findPuzzle = await Game.findOne({
    where: { address: account },
    attributes: ["puzzlePoint"],
  });
  res.json(findPuzzle);
});

router.post("/snakeScore", async (req, res, next) => {
  const { account } = req.body;
  const findSnake = await Game.findOne({
    where: { address: account },
    attributes: ["snakePoint"],
  });
  res.json(findSnake);
});

router.post("/mineScore", async (req, res, next) => {
  const { account } = req.body;
  const findMine = await Game.findOne({
    where: { address: account },
    attributes: ["minePoint"],
  });
  res.json(findMine);
});

router.post("/tetrisSCore", async (req, res, next) => {
  const { account } = req.body;
  const findTetris = await Game.findOne({
    where: { address: account },
    attributes: ["tetrisPoint"],
  });
  res.json(findTetris);
});

module.exports = router;
