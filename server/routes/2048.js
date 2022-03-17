var express = require("express");
var router = express.Router();
const { Puzzle } = require("../models");

router.post("/sendPoint", async (req, res, next) => {
  try {
    //샘플코드
    res.header("Access-Control-Allow-Origin", "*");
    const { point } = req.body;
    const result = await point.request();
    console.log(point);
    res.send(JSON.stringify(result));
    // Snake.create({ point: point });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
