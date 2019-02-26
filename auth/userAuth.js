const jwt = require('jsonwebtoken');
const User = require('../models/admin.models').User;

module.exports = ( req, res, next ) => {
  let token = req.headers['authorization'];
  if ( typeof(token) === 'undefined' ) 
    return res.status(403).json('You cannot hit this endpoint1.');

  let bearer = token.split(' ');
  token = bearer[1];

  jwt.verify( token, process.env.SECRET_KEY, ( err, info) => {
    if(err) return res.status(403).json('You cannot hit this endpoint2.');
    if( info.userId ) {
      User.findByPk( info.userId )
      .then( value => {
        if (!value.statusItem)
          next();
        else
          return res.status(403).json('You cannot hit this endpoint3.');
      })
      .catch( error => res.status(403).json('You cannot hit this endpoint4.') )
    }
    else
      return res.status(403).json('You cannot hit this endpoint5.');
  })  
}