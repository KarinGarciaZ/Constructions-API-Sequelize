const Sequelize = require('sequelize');
const sequelize = new Sequelize( process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});
console.log('DB NAME: ' + process.env.DB_DATABASE + ' USER NAME: ' + process.env.DB_USER + ' DB PASSWORD: ' + process.env.DB_PASSWORD + ' DB HOST: ' + process.env.DB_HOST + ' DB PORT: ' + process.env.DB_PORT)
module.exports = sequelize;