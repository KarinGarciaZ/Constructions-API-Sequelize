const transporter = require('./transporter-config');
const User = require('../admin.models').User;
const Code = require('../admin.models').Code;

const mustache   = require('mustache');
const fs = require('fs');   

const contentEmail = fs.readFileSync('models/Mails/email-reset-password.html',"utf-8");

const Mail = {};

Mail.sendMessage = ( email, name, subject, message, res, cb ) => {
  transporter.sendMail({
    to: process.env.EMAIL_GETS_MESSAGES,
    from: email,
    subject: subject,
    html: name + message
  }).then( () => {
    return cb( null, res, null, 204 )
  })
  .catch( rej => console.log(rej) )
}

Mail.sendEmail = ( email, res, cb ) => {
  User.findOne( { where: { email } } )
  .then( user => {
    if( user ) {
      Mail.sendResetEmail( email, user );
      return cb( null , res, user, 200)
    } else return cb( 'Invalid email', res )
  })
  .catch( error => cb( error, res ) )
}

Mail.sendResetEmail = async ( email, user ) => {
  let code = Math.round(Math.random() * 10000)  
  await Code.update( { statusItem: 1 }, { where: { userId: user.id } } )
  user.createCode( { statusItem: 0, code } )
  .then( () => {
    let view = { code, user };
    let output = mustache.render(contentEmail, view);

    transporter.sendMail({
      to: email,
      from: process.env.EMAIL_SENDS_CODES,
      subject: 'Reset your password',
      html: output
    })
  })
}

Mail.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = Mail;