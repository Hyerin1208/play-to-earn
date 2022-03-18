//server/medels/user.js
const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class Tetris extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                point: {
                    type: Sequelize.INTEGER(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Tetris",
                tableName: "tetrises",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {}
};
