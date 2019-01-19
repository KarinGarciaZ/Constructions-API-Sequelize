// module.exports = ( req, res, next ) => {
//   if ( !req.session.isLoggedIn ) 
//     return res.status(403).json('You cannot hit this endpoint.');
//   next();
// }
const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
  let token = req.headers['authorization'];
  if ( typeof(token) === 'undefined' ) 
    return res.status(403).json('You cannot hit this endpoint.');

  jwt.verify( token, process.env.SECRET_KEY, err => {
    if(err) return res.status(403).json('You cannot hit this endpoint.');
    
    next();
  })  
}