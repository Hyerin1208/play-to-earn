var express = require("express");
var router = express.Router();
const { Snake } = require("../models");

router.post("/", async (req, res, next) => {
  const { point } = req.body;

  try {
    Snake.create({
      point: point,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { point } = req.body;
  res.sendFile(point);
});

module.exports = router;
