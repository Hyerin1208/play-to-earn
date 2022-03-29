const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Game = require("./game");

const db = {};

/* Sequelize 의 객체, 생성자를 sequelize 변수에 저장 */
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/* 바로 위에 선언된 sequelize 변수, db.sequelize 에 저장 */
db.sequelize = sequelize;

db.Sequelize = Sequelize;

db.User = User;
db.Game = Game;

User.init(sequelize);
Game.init(sequelize);

User.associate(db);
Game.associate(db);

module.exports = db;
