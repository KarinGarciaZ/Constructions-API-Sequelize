const Sequelize = require('sequelize');
const sequelize = require('../db_config/mysql-connection');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true },
    unique: true
  },
  phoneNumber: Sequelize.STRING,
  password: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
});
User.sync();

const Type = sequelize.define('type', {
  name: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
});
Type.sync();

module.exports = { User, Type };