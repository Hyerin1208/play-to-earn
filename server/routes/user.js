var express = require("express");
const path = require("path");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");
const { User } = require("../models");

// 회원정보 등록
router.post("/register", async (req, res, next) => {
  // console.log(req.body);
  const { nick, email, address, image } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.json({ message: "User with email already exists!" });
  }

  console.log("이미지" + image);

  const newUser = new User({ nick, email, address, image });

  if (image == false) {
    console.log(1);
    image = "../../client/src/assets/images/img.jpg";
  }
  console.log(image);

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
    attributes: ["nick", "email", "image"],
  });

  // console.log(users);

  if (!users) {
    const login = { nick: "noname", email: "no-email" };
    res.json(login);
  } else {
    const login = { nick: users.nick, email: users.email, image: users.image };
    res.json(login);
  }
});

// uploads 폴더
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

/* multer 기본 설정 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 프로필 IMG CREATE, edit */
router.post("/img", async (req, res) => {
  console.log(req.body.image);
  const { image, address } = req.body;

  try {
    if (image) {
      await User.update(
        {
          image,
        },
        {
          where: { address: address },
        }
      );
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
      res.json({ message: "ok" });
    } else {
      res.json({ message: "no" });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
