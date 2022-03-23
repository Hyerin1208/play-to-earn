const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Snake = require("./snake");
const Puzzle = require("./2048");
const Mine = require("./mine");
const Tetris = require("./tetris");
const Game = require("./game");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Snake = Snake;
db.Puzzle = Puzzle;
db.Mine = Mine;
db.Tetris = Tetris;
db.Game = Game;

User.init(sequelize);
Snake.init(sequelize);
Puzzle.init(sequelize);
Mine.init(sequelize);
Tetris.init(sequelize);
Game.init(sequelize);

User.associate(db);
Snake.associate(db);
Puzzle.associate(db);
Mine.associate(db);
Tetris.associate(db);
Game.associate(db);

module.exports = db;
