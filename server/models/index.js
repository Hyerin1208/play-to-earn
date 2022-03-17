const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Snake = require("./snake");
const Puzzle = require("./2048");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Snake = Snake;
db.Puzzle = Puzzle;

User.init(sequelize);
Snake.init(sequelize);
Puzzle.init(sequelize);

User.associate(db);
Snake.associate(db);
Puzzle.associate(db);

module.exports = db;
