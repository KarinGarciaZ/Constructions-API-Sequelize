const transporter = require('./transporter-config');

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

Mail.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = Mail;