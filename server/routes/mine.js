var express = require("express");
var router = express.Router();
const { Mine } = require("../models");

router.post("/", async (req, res, next) => {
  const { bestTime } = req.body;

  try {
    Mine.create({
      point: bestTime,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
