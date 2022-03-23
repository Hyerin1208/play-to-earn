var express = require("express");
var router = express.Router();
const { Snake } = require("../models");

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

router.put("/", async (req, res, next) => {
  const { point, account } = req.body;

  try {
    Snake.update(
      {
        point: point,
      },
      { where: { address: account } }
    );
    return res.json({ message: "sucess" });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

router.get("/", (req, res) => {
  res.send("ddd");
});

module.exports = router;
