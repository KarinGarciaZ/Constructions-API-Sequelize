const jwt = require('jsonwebtoken');
const User = require('../models/admin.models').User;

module.exports = ( req, res, next ) => {
  let token = req.session.jwt;
  if ( typeof(token) === 'undefined' ) 
    return res.status(403).json('Token undefined.');

  let bearer = token.split(' ');
  token = bearer[1];

  jwt.verify( token, process.env.SECRET_KEY, ( err, info) => {
    if(err) return res.status(403).json('Token no valid.');
    if( info.userId ) {
      User.findByPk( info.userId )
      .then( value => {
        if (!value.statusItem)
          next();
        else
          return res.status(403).json('User deleted before.');
      })
      .catch( error => res.status(403).json('User does not exists.') )
    }
    else
      return res.status(403).json('UserId not stored in token.');
  })  
}