const User = require('../admin.models').User;
const Code = require('../admin.models').Code;
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcryptjs');

const mustache   = require('mustache');
const fs = require('fs');   
const contentEmail = fs.readFileSync('models/ResetCode/email-reset-password.html',"utf-8");

const transporter = nodeMailer.createTransport(sendGridTransport({
  auth: {
    api_key: process.env.SEND_GRID
  }
}))
const ResetCode = {};

ResetCode.sendEmail = ( email, res, cb ) => {
  User.findOne( { where: { email } } )
  .then( user => {
    if( user ) {
      ResetCode.sendResetEmail( email, user );
      return cb( null , res, user, 200)
    } else return cb( 'Invalid email', res )
  })
  .catch( error => cb( error, res ) )
}

ResetCode.sendResetEmail = async ( email, user ) => {
  let code = Math.round(Math.random() * 10000)  
  await Code.update( { statusItem: 1 }, { where: { userId: user.id } } )
  user.createCode( { statusItem: 0, code } )
  .then( () => {

    const view = { code, user };
    const output = mustache.render(contentEmail, view);

    transporter.sendMail({
      to: email,
      from: process.env.EMAIL_SENDS_CODES,
      subject: 'Reset your password',
      html: output
    })
  })
}

ResetCode.verifyCode = (code, userId, newPassword, res, cb) => {
  Code.findOne( { where: { userId, code, statusItem: 0 } } )
  .then( cod => {
    if( cod ) {
      Code.update( { statusItem: 1 }, { where: { userId } } )
      ResetCode.changePassword( userId, newPassword )
      return cb( null, res, {}, 200 )
    } else return cb( 'invalid code.', res )
  })
  .catch( error => cb( error, res ) ) 
}

ResetCode.changePassword = async ( userId, newPassword ) => {  
  let newPassEncrypted = await bcrypt.hash( newPassword, 12 );
  User.update( {password: newPassEncrypted}, { where: {id: userId} } )    
}

ResetCode.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = ResetCode;