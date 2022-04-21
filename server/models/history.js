const Sequelize = require("sequelize");

module.exports = class History extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tokenId: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        from: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        to: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "History",
        tableName: "histories",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // db.History.belongsTo(db.Nfts, {
    //   foreignKey: "tokenId",
    //   targetKey: "tokenId",
    // });
  }
};
