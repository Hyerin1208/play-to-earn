var express = require("express");
var router = express.Router();
const { Puzzle } = require("../models");

router.post("/", async (req, res, next) => {
  const { score, account } = req.body;

  try {
    Puzzle.create({
      point: score,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.put("/", async (req, res, next) => {
  const { score, account } = req.body;

  try {
    Puzzle.update(
      {
        point: score,
      },
      { where: { address: account } }
    );
    return res.json({ message: "sucess" });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { score, account } = req.body;
  res.sendFile(score);
});

module.exports = router;
