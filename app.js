"use strict";

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const env = require('dotenv');
  env.config();

  const adminRoutes = require('./models/admin.routes');

  app.use(bodyParser.json());

  app.use(cors());
  
  app.use(adminRoutes);

  const portExpress = process.env.EXPRESS_PORT;
  const hostExpress = process.env.EXPRESS_HOST;

  app.listen(portExpress, () => {
    console.log(`API ready to get requests...`);
    console.log('running on port '  + portExpress);
  }); 