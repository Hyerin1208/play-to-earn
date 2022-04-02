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
router.post("/login", async (req, res, next) => {
  const { address } = req.body;
  const users = await User.findOne({
    where: { address: address },
    attributes: ["nick", "email"],
  });

  // console.log(users);

  if (!users) {
    const login = { nick: "noname", email: "no-email" };
    res.json(login);
  } else {
    const login = { nick: users.nick, email: users.email };
    res.json(login);
  }
});

// 회원정보 수정
router.post("/edit", async (req, res) => {
  console.log(req.body);

  const { nick, email, address } = req.body;

  try {
    if (nick && email) {
      await User.update(
        {
          nick,
          email,
        },
        {
          where: { address: address },
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
