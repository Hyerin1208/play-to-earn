require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "1234",
    database: "play_to_earn",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "1234",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "play_to_earn",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
