const Image = require('./../admin.models').Image;

/*------------------------------GET--------------------------------*/

Image.getAllImages = ( res, cb ) => {
  Image.findAll()
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

/*------------------------------METHODS--------------------------------*/

Image.responseToClient = ( error, res, data, action ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(action).json(data);
}

module.exports = Image;