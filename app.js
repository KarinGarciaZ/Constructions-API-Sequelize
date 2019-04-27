"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  const formData = require('express-form-data')
  const session = require('express-session');
  env.config();

  //this sets the db config to save sessions
  let sessionStore = require('./db_config/mysql-session');

  app.use(session({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));

  
  app.use(bodyParser.json({limit: '50mb'}));

  app.use()


  //this checks if there is a user in de db
  app.use(require('./default_values/user'));

  //this allows to get images stored in the server
  app.use(express.static('storage/constructions'));
  app.use(express.static('storage/services'));
  
  //this checks the enviroment of server
  const adminRoutes = require('./models/admin.routes');
  app.use( adminRoutes);

  const environmentConfig = require('./enviroments');

  app.listen(3001, environmentConfig.host, () => {
    console.log(`API ready to get requests...`);
    console.log('running on port ' , environmentConfig.port);
  });