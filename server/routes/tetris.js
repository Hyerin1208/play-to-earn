var express = require("express");
var router = express.Router();
const { Tetris } = require("../models");

router.post("/", async (req, res, next) => {
  const { point } = req.body;

  try {
    Tetris.create({
      point: point,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
