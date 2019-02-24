const express = require('express');
const router = express.Router();
const Type = require('./type.model');
const userAuth = require('../../auth/userAuth');

router
.get( '/', ( req, res ) => {
  return Type.getAllTypes( res, Type.responseToClient );
})

.post( '/', userAuth, ( req, res ) => {
  let newTypeName = req.body.name;

  return Type.saveType( newTypeName, res, Type.responseToClient )
})

.put( '/:idType', userAuth, ( req, res ) => {
  let type = {
    id: req.params.idType,
    name: req.body.name
  }

  return Type.updateType( type, res, Type.responseToClient );
})

module.exports = router;