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
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
      },
      {
        sequelize,
        timestamps: true,
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
    db.Nfts.belongsToMany(db.User, {
      through: "Likes",
      as: "Liker",
      foreignKey: "tokenId",
      sourceKey: "tokenId",
      targetKey: "address",
    });
    // db.Nfts.hasMany(db.History, {
    //   foreignKey: "tokenId",
    //   sourceKey: "tokenId",
    // });
  }
};
