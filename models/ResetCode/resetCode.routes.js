const express = require('express');
const router = express.Router();

const ResetCode = require('./resetCode.model');

router.post('/verifyCode', ( req, res ) => {
  let code = req.body.code;
  let userId = req.body.userId;
  let newPassword = req.body.password;

  return ResetCode.verifyCode( code, userId, newPassword, res, ResetCode.responseToClient );
})

module.exports = router;