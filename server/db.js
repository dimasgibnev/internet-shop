const { Sequelize } = require("./sequelize");

module.exports = new Sequelize({
  user: process.env.DB_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});
