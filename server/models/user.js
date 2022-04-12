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
                weeks: {
                    type: Sequelize.INTEGER(100),
                    allowNull: true,
                    defaultValue: 1,
                },
                nick: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                image: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
                count: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
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
        db.User.belongsToMany(db.Nfts, {
            through: "Likes",
            as: "Liked",
            foreignKey: "address",
            sourceKey: "address",
            targetKey: "tokenId",
        });
        // db.User.belongsToMany(db.User, {
        //     through: "History",
        //     as: "Seller",
        //     foreignKey: "from",
        //     sourceKey: "address",
        // });
        // db.User.belongsToMany(db.User, {
        //     through: "History",
        //     as: "Buyer",
        //     foreignKey: "to",
        //     sourceKey: "address",
        // });
    }
};
