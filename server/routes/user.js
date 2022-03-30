var express = require("express");
var router = express.Router();
const { User } = require("../models");

// 회원정보 등록
router.post("/register", async (req, res, next) => {
  // console.log(req.body);
  const { nick, email, address } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.json({ message: "User with email already exists!" });
  }

  const newUser = new User({ nick, email, address });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
  // else res.json({ error: "Cannot register user at the moment!" });
});

// 회원정보 불러오기
router.get("/login", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
    console.log(users);
  } catch (err) {
    console.log(err);
    next(err);
  }

  // const userWithEmail = await User.findOne({ where: { email } }).catch(
  //   (err) => {
  //     console.log("Error :", err);
  //   }
  // );

  // if (!findAddress) return res.json({ message: "Address does not match!" });
});

// 회원정보 수정
router.post("/edit", async (req, res) => {
  const { nick, email } = req.body;
  try {
    if (nick && email) {
      await User.update(
        {
          nick,
          email,
        },
        {
          where: { email: email },
        }
      );
    }
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
