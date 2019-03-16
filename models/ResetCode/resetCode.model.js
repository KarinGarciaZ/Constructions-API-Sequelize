const User = require('../admin.models').User;
const Code = require('../admin.models').Code;

const bcrypt = require('bcryptjs');

const ResetCode = {};

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