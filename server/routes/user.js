var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const User = require("../models/user");
const History = require("../models/history");
const { Op } = require("sequelize");

// 회원정보 확인
router.post("/checkuser", async (req, res, next) => {
    const { nick, email, address } = req.body;

    const alreadyExistsUser = await User.findAll({
        where: {
            [Op.or]: [{ nick: nick }, { email: email }, { address: address }],
        },
    }).catch((err) => {
        console.log("Error: ", err);
    });

    if (alreadyExistsUser.length !== 0) {
        res.json({ result: false, alreadyExistsUser: alreadyExistsUser });
    } else {
        res.json({ result: true, alreadyExistsUser: alreadyExistsUser });
    }
});

// 회원정보 등록
router.post("/register", async (req, res, next) => {
    const { nick, email, address, image, tokenId, name, description, price, contractAddress } = req.body;

    const nft = await Nfts.findOne({
        where: { tokenId: tokenId },
    });
    if (!nft) {
        Nfts.create({
            tokenId: tokenId,
            address: address,
            img: image,
            name: name,
            description: description,
            price: price,
        }).then(() => {
            History.create({
                tokenId: tokenId,
                from: contractAddress,
                to: address,
            }).then(() => {
                User.create({ nick: nick, email: email, address: address, image: image });
                res.json({ message: "ok" });
            });
        });
    } else {
        res.json({ message: "no" });
    }
});

// 회원정보 불러오기
router.post("/login", async (req, res, next) => {
    const { address, owner } = req.body;
    console.log(address);
    console.log(owner);
    if (address === owner) {
        console.log("운영자");
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

router.post("/contact", async (req, res) => {
    const { address } = req.body;

    const users = await User.findOne({
        where: { address: address },
        attributes: ["nick", "email"],
    });

    res.json(users);
});

module.exports = router;
