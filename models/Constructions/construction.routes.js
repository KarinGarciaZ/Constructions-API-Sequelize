const express = require('express');
const router = express.Router();
const Construction = require('./construction.model');
const Image = require('../Images/image.model');
const userAuth = require('../../auth/userAuth');
const upload = require( './multer-configuration' );

router

.get( '/constructionsPerType/:idType', ( req, res ) => {
  let idType = req.params.idType;
  return Construction.getConstructionsPerType( idType, res, Construction.responseToClient )
})

.get( '/:idConstruction', ( req, res ) => {
  let idConstruction = req.params.idConstruction;
  return Construction.getConstructionWidthImagesAndType( idConstruction, res, Construction.responseToClient );
} )

.get( '/numberOfConstructions/:num', (req, res) => {
  let num = req.params.num;
  return Construction.numberOfConstructions( num, res, Construction.responseToClient );
})

.get( '/', ( req, res ) => {
  return Construction.getAllConstructionsWithImagesAndType( res, Construction.responseToClient );
} )

.post( '/', userAuth, upload, ( req, res ) => {

  let constructionData = JSON.parse(req.body.constructionData);

  const newConstruction = {
    title: constructionData.title,
    description: constructionData.description,
    statusConstruction: constructionData.statusConstruction,
    address: constructionData.address,
    city: constructionData.city,
    state: constructionData.state,
    startDate: constructionData.startDate,
    finishDate: constructionData.finishDate,
    statusItem: 0
  }

  let idType = constructionData.idType;

  let newImages = req.files.map( (image, index) => {
    let mainImage = 0
    if (index === constructionData.mainImage)
      mainImage = 1
    return { url: image.filename, mainImage, statusItem: 0 }
  })

  return Construction.saveConstructionWithImages( newConstruction, newImages, idType, res, Construction.responseToClient);

})

.put( '/:idConstruction', userAuth, upload, ( req, res ) => {

  let constructionData = JSON.parse(req.body.constructionData);

  const constructionUpdated = {
    title: constructionData.title,
    description: constructionData.description,
    statusConstruction: constructionData.statusConstruction,
    address: constructionData.address,
    city: constructionData.city,
    state: constructionData.state,
    startDate: constructionData.startDate,
    finishDate: constructionData.finishDate,
    typeId: constructionData.idType
  }

  const idConstruction = req.params.idConstruction;
  let mainImage = constructionData.mainImage

  let newImages = req.files.map( (image, index) => {
    return { url: image.filename, mainImage: 0, statusItem: 0 }
  })

  Image.updateMain( idConstruction, mainImage )
  return Construction.updateConstruction( idConstruction, constructionUpdated, newImages, res, Construction.responseToClient )
})

.delete( '/:idConstruction', userAuth, ( req, res ) => {
  let idConstruction = req.params.idConstruction;
  Construction.deleteConstruction( idConstruction, res, Construction.responseToClient );
} )

module.exports = router;