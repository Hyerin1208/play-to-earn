const Sequelize = require("sequelize");

module.exports = class Staking extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        stakerId: {
          type: Sequelize.INTEGER(200),
          allowNull: false,
          unique: true,
        },
        address: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Staking",
        tableName: "stakings",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
};
