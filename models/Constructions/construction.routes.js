const express = require('express');
const router = express.Router();
const Construction = require('./construction.model');
const isAuth = require('../../auth');

router

.get( '/constructionsPerType/:idType', ( req, res ) => {
  let idType = req.params.idType;
  return Construction.getConstructionsPerType( idType, res, Construction.responseToClient )
})

.get( '/:idConstruction', ( req, res ) => {
  let idConstruction = req.params.idConstruction;
  return Construction.getConstructionWidthImagesAndType( idConstruction, res, Construction.responseToClient );
} )

.get( '/', ( req, res ) => {
  return Construction.getAllConstructionsWithImagesAndType( res, Construction.responseToClient );
} )

.post( '/', isAuth, ( req, res ) => {
  const newConstruction = {
    title: req.body.title,
    description: req.body.description,
    statusConstruction: req.body.statusConstruction,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    statusItem: 0
  }

  let idType = req.body.idType;

  const newImages = req.body.images;

  return Construction.saveConstructionWithImages( newConstruction, newImages, idType, res, Construction.responseToClient);

})

.put( '/:idConstruction', isAuth, ( req, res ) => {
  const constructionUpdated = {
    title: req.body.title,
    description: req.body.description,
    statusConstruction: req.body.statusConstruction,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    typeId: req.body.typeId
  }

  const idConstruction = req.params.idConstruction;

  const newImages = req.body.images;

  return Construction.updateConstruction( idConstruction, constructionUpdated, newImages, res, Construction.responseToClient )
})

.delete( '/:idConstruction', isAuth, ( req, res ) => {
  let idConstruction = req.params.idConstruction;
  Construction.deleteConstruction( idConstruction, res, Construction.responseToClient );
} )

module.exports = router;