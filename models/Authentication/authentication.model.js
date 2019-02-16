const User = require('../admin.models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = {};

Auth.getUserByToken = ( req, res, cb ) => {
  let token = req.headers['authorization'];
  if ( typeof(token) === 'undefined' ) 
    return cb( 'No credentials to get into system', res );

  let bearer = token.split(' ');
  token = bearer[1];

  jwt.verify( token, process.env.SECRET_KEY, ( err, info) => {
    if(err) return cb( 'No credentials to get into system', res );
    if( info.userId ) {
      User.findOne( { where: { id: info.userId } } )
      .then( user => cb( null, res, user, 200 ) )
      .catch( error => cb( error, res ) )
    }      
    else
      return cb( 'No credentials to get into system', res );
  })  
}

Auth.login = ( user, res, cb ) => {
  User.findOne( { where: { username: user.username } } )
  .then( async userInfo => {
    let matchPasswords = await bcrypt.compare( user.password, userInfo.password )
    if ( matchPasswords ) {
      jwt.sign({userId: userInfo.id}, process.env.SECRET_KEY, { expiresIn: '30d' }, ( err, token ) => {
        if ( err )
          return cb( err, res )
        else {          
          let resp = { userInfo, token }
          return cb( null, res, resp, 200 );
        }
      })      
    } else 
      cb( 'Passwords do not match', res );
  })
  .catch( error => cb( error, res ) )
}

Auth.resetPassword = ( email, res, cb ) => {
  User.findOne( { where: { email } } )
  .then( user => {
    if( user ) {
      return cb( null , res, user, 200)
    } else return cb( 'Invalid email', res )
  })
  .catch( error => cb( error, res ) )
}

Auth.responseToClient = ( error, res, data, status ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(status).json(data);
}

module.exports = Auth;