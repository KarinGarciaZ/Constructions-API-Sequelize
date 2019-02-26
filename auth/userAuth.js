const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
  let token = req.headers['authorization'];
  if ( typeof(token) === 'undefined' ) 
    return res.status(403).json('You cannot hit this endpoint1.');

  let bearer = token.split(' ');
  token = bearer[1];

  jwt.verify( token, process.env.SECRET_KEY, ( err, info) => {
    if(err) return res.status(403).json('You cannot hit this endpoint2.');
    if( info.userId )//falta verificar si el usuario existe
      next();
    else
      return res.status(403).json('You cannot hit this endpoint3.');
  })  
}