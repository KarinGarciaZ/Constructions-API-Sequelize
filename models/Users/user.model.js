const User = require('./../admin.models').User;
const bcrypt = require('bcryptjs');

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

User.getByAuth = ( user, req, res, cb ) => {
  User.findOne( { where: { username: user.username } } )
  .then( async data => {
    let matchPasswords = await bcrypt.compare( user.password, data.password )
    if ( matchPasswords ) {
      req.session.isLoggedIn = true;
      cb( null, res, data, 200 );
    } else 
      cb( 'Passwords do not match', res );
  })
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