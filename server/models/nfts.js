const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
    static init(sequelize) {
      return super.init(
        {
          img: {
            type: Sequelize.STRING(200),
            allowNull: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        },      
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Club",
            tableName: "clubs",
            paranoid: true,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
          }
        );
      }