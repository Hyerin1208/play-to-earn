var express = require("express");
var router = express.Router();
const { Game, User, Ranking, Nfts } = require("../models");
const { Op } = require("sequelize");

// router.post 모음
// SnakeGame

router.post("/snake", async (req, res, next) => {
  const { point, account, tokenId } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });
    const findStar = await Nfts.findOne({
      where: { id: tokenId[0] },
      attributes: ["star"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        snakePoint: point,
      });
    } else {
      if (findStar.star === 1) {
        Game.update(
          { snakePoint: point, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 2) {
        Game.update(
          { snakePoint: point * 1.2, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 3) {
        Game.update(
          { snakePoint: point * 1.3, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 4) {
        Game.update(
          { snakePoint: point * 1.4, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 5) {
        Game.update(
          { snakePoint: point * 1.5, nick: findUser.nick },
          { where: { address: account } }
        );
      }
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 2048Game
router.post("/2048", async (req, res, next) => {
  const { score, account, tokenId } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });
    const findStar = await Nfts.findOne({
      where: { id: tokenId[0] },
      attributes: ["star"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        puzzlePoint: score,
      });
    } else {
      if (findStar.star === 1) {
        Game.update(
          { puzzlePoint: point, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 2) {
        Game.update(
          { puzzlePoint: score * 1.2, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 3) {
        Game.update(
          { puzzlePoint: score * 1.3, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 4) {
        Game.update(
          { puzzlePoint: score * 1.4, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 5) {
        Game.update(
          { puzzlePoint: score * 1.5, nick: findUser.nick },
          { where: { address: account } }
        );
      }
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
  const { data, account, tokenId } = req.body;

  try {
    const findAddress = await Game.findOne({ where: { address: account } });
    const findUser = await User.findOne({
      where: { address: account },
      attributes: ["address", "nick"],
    });
    const findStar = await Nfts.findOne({
      where: { id: tokenId[0] },
      attributes: ["star"],
    });

    if (!findAddress) {
      Game.create({
        address: findUser.address,
        nick: findUser.nick,
        tetrisPoint: data,
      });
    } else {
      if (findStar.star === 1) {
        Game.update(
          { tetrisPoint: data, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 2) {
        Game.update(
          { tetrisPoint: data * 1.2, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 3) {
        Game.update(
          { tetrisPoint: data * 1.3, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 4) {
        Game.update(
          { tetrisPoint: data * 1.4, nick: findUser.nick },
          { where: { address: account } }
        );
      } else if (findStar.star === 5) {
        Game.update(
          { tetrisPoint: data * 1.5, nick: findUser.nick },
          { where: { address: account } }
        );
      }
    }

    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get 모음

// SnakeGame
router.post("/ranking", async (req, res) => {
  const address = req.body.address;
  console.log("///////////////////////////////////////");
  console.log(address);
  const snake = await Game.findAll({
    where: { snakePoint: { [Op.not]: null } },
    attributes: ["nick", "snakePoint", "address"],
    order: [["snakePoint", "desc"]],
  });

  const snakeranker = await snake.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.snakePoint,
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
    attributes: ["nick", "puzzlePoint", "address"],
    order: [["puzzlePoint", "desc"]],
  });

  const puzzleranker = await puzzle.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.puzzlePoint,
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
    attributes: ["nick", "minePoint", "address"],
    order: [["minePoint", "ASC"]],
  });

  const mineranker = await mine.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.minePoint,
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
    attributes: ["nick", "tetrisPoint", "address"],
    order: [["tetrisPoint", "desc"]],
  });

  const tetrisranker = await tetris.map((data, i) => {
    if (i < 3) {
      let form = {
        nick: data.nick,
        address: data.address,
        snakePoint: data.tetrisPoint,
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
    where: { address: "0x5c87082b90ED0aBAd05f2654Cd1651FD6165cd07" },
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

module.exports = router;
