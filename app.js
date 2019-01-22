"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  env.config();

  app.use(bodyParser.json());

  app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  } )

  app.use(cors());

  const Authentication = require('./models/Authentication/authentication.routes');
  app.use('/auth', Authentication)
  
  const adminRoutes = require('./models/admin.routes');
  const isAuth = require('./auth/auth');
  app.use( isAuth, adminRoutes);  

  const environmentConfig = require('./enviroments');

  app.listen(3001, environmentConfig.host, () => {
    console.log(`API ready to get requests...`);
    console.log('running on port ' , environmentConfig.port);
  });