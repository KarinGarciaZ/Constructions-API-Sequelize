const express = require('express');
const router = express.Router();

const ResetCode = require('./resetCode.model');

router.post('/resetPassword', ( req, res ) => {
  let email = req.body.email;

  return ResetCode.resetPassword( email, res, ResetCode.responseToClient );
})

module.exports = router;