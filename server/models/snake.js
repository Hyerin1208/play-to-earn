//server/medels/user.js
const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class Snake extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
          unique: true
        },
        nick: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        point: {
          type: Sequelize.INTEGER(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Snake",
        tableName: "snakes",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
