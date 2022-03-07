var express = require("express");
var router = express.Router();
const { User } = require("../models");

router.post("/", async (req, res, next) => {
    //샘플코드
    const { email, nick, password } = req.body;
    try {
        const findUser = await User.findOne({ where: { email } });

        if (findUser) {
            return res.json({ message: "이미 가입한 이메일 입니다." });
        }

        User.create({
            nick: nick,
            email: email,
            password: password,
        });

        return res.json({ message: "가입이 완료되었습니다." });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;
