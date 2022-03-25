var express = require("express");
var router = express.Router();
const { Mine } = require("../models");

router.post("/", async (req, res, next) => {
  const { runtime, account } = req.body;

  try {
    Mine.create({
      point: runtime,
      address: account,
    });
    return res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.put("/", async (req, res, next) => {
  const { runtime, account } = req.body;

  try {
    Mine.update(
      {
        point: runtime,
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
  const users = await Mine.findAll({
    attributes: ["address", "point"],
    order: [["point", "asc"]],
  });
  const mine = [];

  for (const user of users) {
    mine.push({
      address: user.address,
      point: user.point,
    });
  }

  res.json(mine);
});

module.exports = router;
