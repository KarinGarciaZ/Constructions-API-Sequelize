const User = require('../admin.models').User;
const Code = require('../admin.models').Code;
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodeMailer.createTransport(sendGridTransport({
  auth: {
    api_key: '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'
  }
}))
const ResetCode = {};

ResetCode.resetPassword = ( email, res, cb ) => {
  User.findOne( { where: { email } } )
  .then( user => {
    if( user ) {
      ResetCode.sendResetEmail( email, user );
      return cb( null , res, user, 200)
    } else return cb( 'Invalid email', res )
  })
  .catch( error => cb( error, res ) )
}

ResetCode.sendResetEmail = ( email, user ) => {
  let code = (Math.random() * 10000)
  code = Math.round(code)
  user.createCode( { statusItem: 0, code } )
  .then( () => {
    transporter.sendMail({
      to: email,
      from: 'oscarin962010@hotmail.com',
      subject: 'Reset your password',
      html:`<p>${code}</p>`
    })
  })
}

ResetCode.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = ResetCode;