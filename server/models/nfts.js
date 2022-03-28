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
                likes: {
                    type: Sequelize.INTEGER(200),
                    allowNull: false,
                    defaultValue: 0,
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
        // db.Nfts.belongsToMany(db.User, { through: "Likes" });
        db.Nfts.belongsToMany(db.User, { through: "Likes", as: "Liker", foreignKey: "tokenId", sourceKey: "tokenId", targetKey: "address" });
    }
};
