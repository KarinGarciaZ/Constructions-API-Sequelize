const User = require('./../admin.models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

User.getAllUsers = ( res, cb ) => {
  User.findAll( { where: { statusItem: 0 } } )
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.getSingleUser = ( id, res, cb ) => {
  User.findByPk(id)
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.saveNewUser = ( newUser, res, cb ) => {
  User.create(newUser)
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.updateUser = ( user, req, res, cb ) => {
  User.getUserByToken( req, ( error, userResp ) => {
    if( error ) cb(error, res)
    User.update(user, { where: { id: userResp.id } } )
    .then( data => cb( null, res, data, 200 ) )
    .catch( error => cb( error, res ) )
  })
}

User.changePassword = (currentPassword, newPassword, req, res, cb ) => {
  User.getUserByToken( req, async ( error, user ) => {
    if( error ) cb(error, res)
    let matchPasswords = await bcrypt.compare( currentPassword, user.password )
    if ( matchPasswords ) {
      newPassEncrypted = await bcrypt.hash( newPassword, 12 );
      User.update( {password: newPassEncrypted}, { where: {id: user.id} } )
      .then( data => cb(null, res, 'updated', 201))
      .catch( error => cb(error, res))
    } else cb('Invalid password', res)
  })
}

User.deleteUser = ( idUser, res, cb ) => {
  User.update({ statusItem: 1 }, { where: { id: idUser } })
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.getUserByToken = ( req, cb ) => {
  let token = req.headers['authorization'];
  let bearer = token.split(' ');
  token = bearer[1];

  jwt.verify( token, process.env.SECRET_KEY, ( err, info) => {
    if(err) return cb( err );
    if( info.userId ) {
      User.findOne( { where: { id: info.userId } } )
      .then( user => cb( null, user ) )
      .catch( error => cb( error ) )
    }      
    else
      return cb( err );
  })  
}

User.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = User;