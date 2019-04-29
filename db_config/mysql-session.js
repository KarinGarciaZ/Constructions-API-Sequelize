const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
    
const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};


const sessionStore = new MySQLStore(options);

module.exports = sessionStore;
