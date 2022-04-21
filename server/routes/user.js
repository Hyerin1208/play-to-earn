var express = require("express");
var router = express.Router();
const User = require("../models/user");

// 회원정보 등록
router.post("/register", async (req, res, next) => {
  const { nick, email, address, image } = req.body;

  const alreadyExistsEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  const alreadyExistsNick = await User.findOne({ where: { nick } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsNick) {
    return res.json({ message: "닉네임이 이미 존재합니다!", bool: false });
  }
  if (alreadyExistsEmail) {
    return res.json({ message: "이메일이 이미 존재합니다!", bool: false });
  }

  const newUser = new User({ nick, email, address, image });

  if (image == false) {
    image = "../../client/src/assets/images/img.jpg";
  }

  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.json({ error: "회원가입을 할 수 없습니다!", bool: true });
  });

  if (savedUser)
    res.json({ message: "회원가입 해주셔서 감사합니다", bool: true });
  else res.json({ error: "회원가입을 할 수 없습니다!", bool: true });
});

// 회원정보 불러오기
router.post("/login", async (req, res, next) => {
  const { address, owner } = req.body;
  if (address === owner) {
    res.json({ nick: "운영자" });
  } else {
    const users = await User.findOne({
      where: { address: address },
      attributes: ["nick", "email", "image"],
    });

    if (!users) {
      const login = { nick: "noname", email: "no-email" };
      res.json(login);
    } else {
      const login = {
        nick: users.nick,
        email: users.email,
        image: users.image,
      };
      res.json(login);
    }
  }
});

/* 프로필 IMG CREATE, edit */
router.post("/img", async (req, res) => {
  const { image, address } = req.body;

  try {
    if (image) {
      await User.update({ image }, { where: { address: address } });
      res.json({ message: "ok" });
    } else {
      res.json({ message: "no" });
    }
  } catch (err) {
    res.json({ message: "err" });
    return next(err);
  }
});

// 회원정보 수정
router.post("/edit", async (req, res) => {
  const { nick, email, address } = req.body;

  try {
    if (nick && email) {
      await User.update({ nick, email }, { where: { address: address } });
      res.json({ message: "ok" });
    } else {
      res.json({ message: "no" });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// 오너 유저의 회차 가져가버리기!
router.post("/weeks", async (req, res) => {
  const { address } = req.body;
  const users = await User.findOne({
    where: { address: address },
    attributes: ["address", "weeks"],
  });

  if ((users.address = address)) {
    const round = { weeks: users.weeks };
    res.json(round);
  } else {
  }
});

// 오너체크
router.post("/owner", async (req, res, next) => {
  try {
    const newDate = new Date().getTime() + 604800000;

    const address = req.body.address;
    const owner = await User.findOne({ where: { address: address } });
    if (owner) {
      res.json({ message: "운영자 맞아요", count: owner.count });
    } else {
      await User.create({
        address: address,
        nick: "운영자",
        image: "/images/naminglogo.png",
        email: "Owner@gmail.com",
        count: newDate.toString(),
      });
      res.json({
        message: "첫번째 실행으로 운영자 계정만들어요",
        count: newDate.toString(),
      });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get("/time", async (req, res) => {
  const timer = await User.findOne({
    attributes: ["count"],
    where: { nick: "운영자" },
  });
  res.send(timer);
});

module.exports = router;
