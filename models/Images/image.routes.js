const app = require('express');
const router = app.Router();
const Image = require('./image.model');

router
.get( '/', ( req, res ) => {
  return Image.getAllImages( res, Image.responseToClient );
} )

module.exports = router;