const express = require('express');
const router = express.Router();
const isAuth = require('../../auth/auth');


const Auth = require('./authentication.model');

router.get('/getUserByToken', isAuth, (req, res) => {
  Auth.getUserByToken( req, res, Auth.responseToClient )
})

router.get('/website-token', ( req, res ) => {
  Auth.getWebsiteToken( req, res, Auth.responseToClient );
})

router.post('/login', isAuth, (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  return Auth.login( user, req, res, Auth.responseToClient )
})

router.post('/logout', isAuth, (req, res) => {
  return Auth.logout( req, res, Auth.responseToClient )
})

module.exports = router;