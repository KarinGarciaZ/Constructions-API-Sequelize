const express = require('express');
const router = express.Router();

const ResetCode = require('./resetCode.model');

router.post('/resetPassword', ( req, res ) => {
  let email = req.body.email;

  return ResetCode.sendEmail( email, res, ResetCode.responseToClient );
})

router.post('/sendMessage', ( req, res ) => {
  let email = req.body.email;
  let name = req.body.name;
  let subject = req.body.subject;
  let message =  req.body.message;

  return ResetCode.sendMessage( email, name, subject, message, res, ResetCode.responseToClient );
})

router.post('/verifyCode', ( req, res ) => {
  let code = req.body.code;
  let userId = req.body.userId;
  let newPassword = req.body.password;

  return ResetCode.verifyCode( code, userId, newPassword, res, ResetCode.responseToClient );
})

module.exports = router;