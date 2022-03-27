const Sequelize = require("sequelize");

module.exports = class Nfts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tokenId: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        userId: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Nft",
        tableName: "nfts",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // db.Nfts.belongsTo(db.User, { foreignKey: "userId", targetKey: "address" });
    // db.Nfts.belongsToMany(db.User, { through: "Likes" }); // 좋아요
    // db.Nfts.belongsTo(db.User, { foreignKey: "tokenId", targetKey: "tokenId" });
  }
};
