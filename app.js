"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  env.config();

  app.use(bodyParser.json());

  app.use( ( req, res, next ) => {
    console.log(req.headers['authorization'])
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next();
  })

  app.use( ( req, res, next ) => {
    if ( req.method === 'OPTIONS' ) {
      res.sendStatus(204);
    }
    next();
  })

  //app.use(cors( {origin: '*', methods: 'GET, POST, PUT, DELETE, OPTIONS', allowedHeaders: 'Content-Type, Authorization'} ));

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