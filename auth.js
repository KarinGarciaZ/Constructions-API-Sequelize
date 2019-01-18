module.exports = ( req, res, next ) => {
  if ( !req.session.isLoggedIn ) 
    return res.status(403).json('You cannot hit this endpoint.');
  next();
}