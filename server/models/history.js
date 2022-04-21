const Sequelize = require("sequelize");

module.exports = class History extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                tokenId: {
                    type: Sequelize.INTEGER(200),
                    allowNull: false,
                },
                from: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                to: {
                    type: Sequelize.INTEGER(200),
                    allowNull: false,
                    defaultValue: 0,
                },
                createdAt: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
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
        db.History.belongsTo(db.Nfts, {
            foreignKey: "tokenId",
            targetKey: "tokenId",
        });
    }
};
