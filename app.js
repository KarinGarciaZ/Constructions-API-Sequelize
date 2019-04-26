"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  const session = require('express-session');

  

  env.config();
  app.use(bodyParser.json({limit: '50mb'}));


  
  let sessionStore = require('./db_config/mysql-session');

  app.use(session({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));




  app.use(cors( {origin:true, credentials: true} ));

  app.use(require('./default_values/user'));

  app.use(express.static('storage/constructions'));
  app.use(express.static('storage/services'));
  
  const adminRoutes = require('./models/admin.routes');
  app.use( adminRoutes);

  const environmentConfig = require('./enviroments');

  app.listen(3001, environmentConfig.host, () => {
    console.log(`API ready to get requests...`);
    console.log('running on port ' , environmentConfig.port);
  });