var express = require("express");
var router = express.Router();
const { Snake } = require("../models");

router.get("/snakePoint", async (req, res, next) => {
  //샘플코드
  const { score } = req.body;
  try {
    const findSnake = await Snake.findOne({ where: { point } });

    if (findSnake) {
      return res.json({ message: "fff" });
    }

    Snake.create({
      point: score,
    });

    return res.json({ message: "ddd" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
