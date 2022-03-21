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
  Puzzle.update(score, { where: account === account }) // 검색 조건이 있을 경우 조건에 맞게 데이터를 수정한다.
    .then((result) => {
      console.log("수정 성공: ", result);
      return res.send({ success: true });
    })
    .catch((err) => {
      console.log("수정 Error: ", err);
      return res.send({ success: false });
    });
});

router.get("/", async (req, res, next) => {
  const { score, account } = req.body;
  res.sendFile(score);
});

module.exports = router;
