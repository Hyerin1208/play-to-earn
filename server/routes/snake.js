var express = require("express");
var router = express.Router();
const { Snake } = require("../models");
const db = require("../config/config.json");

router.post("/", async (req, res, next) => {
  const { point, account } = req.body;

  try {
    Snake.create({
      point: point,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get("/", (req, res) => {
//   // sql query 문
//   const sql = "SELECT id FROM `snakes` WHERE `id` = ?";
//   // 전달받은 parameter 값
//   const params = req.query.id;
//   db.query(sql, params, (err, data) => {
//     if (!err) {
//       res.send(data);
//     } else {
//       res.send(err);
//     }
//   });
// });

router.get("/", (req, res) => {
  res.send("ddd");
});

module.exports = router;
