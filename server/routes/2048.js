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

router.get("/", async (req, res) => {
  const users = await Puzzle.findAll({
    attributes: ["address", "point"],
    order: [["point", "desc"]],
  });
  const puzzle = [];

  for (const user of users) {
    puzzle.push({
      address: user.address,
      point: user.point,
    });
  }

  res.json(puzzle);
});

module.exports = router;
