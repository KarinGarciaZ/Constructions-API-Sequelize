const express = require('express');
const router = express.Router();
const Type = require('./type.model');
const isAuth = require('../../auth');

router
.get( '/', ( req, res ) => {
  return Type.getAllTypes( res, Type.responseToClient );
})

.post( '/', isAuth, ( req, res ) => {
  let newTypeName = req.body.name;

  return Type.saveType( newTypeName, res, Type.responseToClient )
})

.put( '/:idType', isAuth, ( req, res ) => {
  let type = {
    id: req.params.idType,
    name: req.body.name
  }

  return Type.updateType( type, res, Type.responseToClient );
})

module.exports = router;