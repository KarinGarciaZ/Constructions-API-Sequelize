const User = require('./../admin.models').User;

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

User.getByAuth = ( user, res, cb ) => {
  User.findOne( { where: { 
        username: user.username, 
        password: user.password 
      } } )
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.saveNewUser = ( newUser, res, cb ) => {
  User.create(newUser)
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

User.updateUser = ( user, res, cb ) => {
  User.update(user, { where: { username: user.username } } )
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