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

User.updateUser = ( user, res, cb ) => {
  User.update(user, { where: { id: user.id } } )
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.changePassword = (userId, passwords, res, cb ) => {
  User.findOne({ where: { id: userId } })
  .then( async user => {
    let matchPasswords = await bcrypt.compare( passwords.currentPassword, user.password )
    if ( matchPasswords ) {
      newPassEncrypted = await bcrypt.hash( passwords.newPassword, 12 );
      User.update( {password: newPassEncrypted}, { where: {id: userId} } )
      .then( data => cb(null, res, 'updated', 201))
      .catch( error => cb(error, res))
    } else cb('Invalid password', res)
  })
  .catch( err => cb(err, res))
}

User.deleteUser = ( idUser, res, cb ) => {
  User.update({ statusItem: 1 }, { where: { id: idUser } })
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = User;