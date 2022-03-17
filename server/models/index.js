const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Snake = require("./snake");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Snake = Snake;

User.init(sequelize);
Snake.init(sequelize);

User.associate(db);
Snake.associate(db);

module.exports = db;
