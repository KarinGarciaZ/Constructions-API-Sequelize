"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  env.config();

  app.use(bodyParser.json());

  app.use(cors({ origin:true, credentials: true }));

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