var express = require("express");
var router = express.Router();
const { User } = require("../models");

router.post("/register", async (req, res, next) => {
  // console.log(req.body);
  const { nick, email } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.json({ message: "User with email already exists!" });
  }

  const newUser = new User({ nick, email });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
  // else res.json({ error: "Cannot register user at the moment!" });
});

router.get("/login", async (req, res) => {
  const { email } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error :", err);
    }
  );

  if (!userWithEmail) return res.json({ message: "Email does not match!" });

  res.json({ message: "Welcome Back!" });
});

module.exports = router;
