const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
  let token = req.headers['authorization'];
  if ( typeof(token) === 'undefined' ) 
    return res.status(403).json('You cannot hit this endpoint4.');

  let bearer = token.split(' ');
  token = bearer[1];
  
  jwt.verify( token, process.env.SECRET_KEY, err => {
    if(err) return res.status(403).json('You cannot hit this endpoint5.');
    
    next();
  })  
}