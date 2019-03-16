const app = require('express');
const router = app.Router();

const Mail = require('./mail.model');

router.post('/sendMessage', ( req, res ) => {
  let email = req.body.email;
  let name = req.body.name;
  let subject = req.body.subject;
  let message =  req.body.message;

  return Mail.sendMessage( email, name, subject, message, res, Mail.responseToClient );
})

module.exports = router;