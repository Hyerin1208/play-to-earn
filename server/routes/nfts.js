var express = require("express");
var router = express.Router();
const Nfts = require("../models/nfts");
const User = require("../models/user");

router.post("/", async (req, res, next) => {
    // Nfts.create({ tokenId: req.body.id });
    // User.create({ address: `ad${req.body.id}`, nick: `ad${req.body.id}` });
    const nft = await Nfts.findOne({
        where: { tokenId: 1 },
    });
    const user = await User.findOne({ where: { address: "ad2" } });
    console.log(await user);

    await nft.addLiker(user);

    const nfts = await Nfts.findOne({
        where: { tokenId: 1 },
        include: [
            {
                model: User,
                attributes: ["id", "address"],
                as: "Liker",
            },
        ],
    });

    res.json({ message: "ok" });
});

module.exports = router;
