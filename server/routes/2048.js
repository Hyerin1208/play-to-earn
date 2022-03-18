var express = require("express");
var router = express.Router();
const { Puzzle } = require("../models");

router.post("/", async (req, res, next) => {
  const { score } = req.body;

  try {
    Puzzle.create({
      point: score,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
