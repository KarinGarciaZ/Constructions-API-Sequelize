"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  const formData = require('express-form-data')
  env.config();

  app.use(bodyParser.json({limit: '50mb'}));

  // app.use( ( req, res, next ) => {
  //   console.log(req.headers['authorization'])
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  //   next();
  // })

  // app.use( ( req, res, next ) => {
  //   if ( req.method === 'OPTIONS' ) {
  //     res.sendStatus(204);
  //   }
  //   next();
  // })

  //app.use( cors({ credentials: true, origin: true }) )

  app.use(cors( {credentials: true,  origin: '*', methods: 'GET, POST, PUT, DELETE, OPTIONS', allowedHeaders: 'Content-Type, Authorization'} ));

  //app.use(formData.parse());

  app.use(require('./default_values/user'));

  app.use(express.static('storage/constructions'));
  
  const adminRoutes = require('./models/admin.routes');
  app.use( adminRoutes);

  const environmentConfig = require('./enviroments');

  app.listen(3001, environmentConfig.host, () => {
    console.log(`API ready to get requests...`);
    console.log('running on port ' , environmentConfig.port);
  });