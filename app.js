"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  const session = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  env.config();

  const adminRoutes = require('./models/admin.routes');

  app.use(bodyParser.json());

  var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };
  
  var sessionStore = new MySQLStore(options);
  
  app.use(session({
      secret: 'session_cookie_secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
  }));

  app.use(cors({ origin:true, credentials: true }));
  
  app.use(adminRoutes);

  const environmentConfig = require('./enviroments');

  app.listen(environmentConfig.port, environmentConfig.host, () => {
    console.log(`API ready to get requests...`);
    console.log('running on port ' , environmentConfig.port);
  });