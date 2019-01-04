const Sequelize = require('sequelize');
const sequelize = new Sequelize( process.env.DB_DATABASE, process.env.DB_USER, null, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});

module.exports = sequelize;