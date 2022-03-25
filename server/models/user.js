//server/medels/user.js
const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
          unique: true, // unique: true - 고유하게
        },
        nick: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        defaultimg: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // db.User.hasMany(db.Nfts, { foreignKey: "userId", sourceKey: "id" });
    // db.User.belongsToMany(db.Nfts, { through: "Likes", as: "Likers" }); // 좋아요
  }
};
