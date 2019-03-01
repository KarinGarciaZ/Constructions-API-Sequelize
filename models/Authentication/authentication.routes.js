const express = require('express');
const router = express.Router();

const Auth = require('./authentication.model');

router.get('/getUserByToken', (req, res) => {
  Auth.getUserByToken( req, res, Auth.responseToClient )
})

router.get('/website-token', ( req, res ) => {
  Auth.getWebsiteToken( res, Auth.responseToClient );
})

router.post('/login', (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  return Auth.login( user, res, Auth.responseToClient )
})

module.exports = router;