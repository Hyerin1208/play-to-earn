const Sequelize = require("sequelize");

module.exports = class STAKING extends Sequelize.Model {
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
        reward: {
          type: Sequelize.INTEGER(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "STAKING",
        tableName: "stakings",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
};
