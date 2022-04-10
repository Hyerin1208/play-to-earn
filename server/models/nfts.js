const Sequelize = require("sequelize");

module.exports = class Nfts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tokenId: {
          type: Sequelize.INTEGER(200),
          allowNull: false,
          unique: true,
        },
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        likes: {
          type: Sequelize.INTEGER(200),
          allowNull: false,
          defaultValue: 0,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        rare: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        star: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        createdAt: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Nft",
        tableName: "nfts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // db.Nfts.belongsToMany(db.User, {
    //   through: "views",
    //   as: "viewer",
    //   foreignKey: "address",
    //   sourceKey: "tokenId",
    // });
    db.Nfts.belongsToMany(db.User, {
      through: "Likes",
      as: "Liker",
      foreignKey: "tokenId",
      sourceKey: "tokenId",
      targetKey: "address",
    });
  }
};
