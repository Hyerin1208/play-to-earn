var express = require("express");
var router = express.Router();
const { Tetris } = require("../models");

router.post("/", async (req, res, next) => {
  const { data } = req.body;

  try {
    Tetris.create({
      point: data,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { data } = req.body;
  res.sendFile(data);
});

module.exports = router;
