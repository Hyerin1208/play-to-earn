//server/medels/user.js
const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                address: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        // db.User.belongsToMany(db.Nfts, { through: "Likes" });
        db.User.belongsToMany(db.Nfts, {
            through: "Likes",
            as: "Liked",
            foreignKey: "address",
            sourceKey: "address",
            targetKey: "tokenId",
        });
        // db.User.belongsToMany(db.Nfts, { through: "Likes", as: "Liked", foreignKey: "address", sourceKey: "address", targetKey: "tokenId" });
    }
};
