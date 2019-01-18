const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./user.model');

router.get('/getById/:id', (req, res) => {
  let id = req.params.id;
  return User.getSingleUser( id, res, User.responseToClient )
})

router.get('/', (req, res) => {
  return User.getAllUsers( res, User.responseToClient )
})

router.post('/getByAuth', (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  return User.getByAuth( user, req, res, User.responseToClient )
})

router.post('/', async ( req, res ) => {
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

router.put('/', (req, res) => {
  let user = {
    id: req.body.id,
    username: req.body.username,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  }

  return User.updateUser( user, res, User.responseToClient );
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  return User.deleteUser( id, res, User.responseToClient );
})

module.exports = router;