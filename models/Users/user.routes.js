const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./user.model');
const isAuth = require('../../auth/userAuth');

router.get('/getById/:id', isAuth, (req, res) => {
  let id = req.params.id;
  return User.getSingleUser( id, res, User.responseToClient )
})

router.get('/', isAuth, (req, res) => {
  return User.getAllUsers( res, User.responseToClient )
})

router.post('/', isAuth, async ( req, res ) => {
  let password = req.body.password;
  password = await bcrypt.hash( password, 12 );
  let user = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: password,
    statusItem: 0
  }

  return User.saveNewUser( user, res, User.responseToClient );
})

router.put('/changePassword', isAuth, ( req, res ) => {  
  let newPassword = req.body.newPassword;
  let currentPassword = req.body.currentPassword;
  return User.changePassword( currentPassword, newPassword, req, res, User.responseToClient );
})

router.put('/', isAuth, (req, res) => {
  let user = {
    id: req.body.id,
    username: req.body.username,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  }

  return User.updateUser( user, res, User.responseToClient );
})

router.delete('/:id', isAuth, (req, res) => {
  let id = req.params.id;
  return User.deleteUser( id, res, User.responseToClient );
})

module.exports = router;