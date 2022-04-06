//server/medels/user.js
const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class Ranking extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        weeks: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        games: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        rank: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        nick: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        balance: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        claim: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Ranking",
        tableName: "rankings",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
