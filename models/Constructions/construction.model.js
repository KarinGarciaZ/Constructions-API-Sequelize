const Type = require('./../admin.models').Type;
const Image = require('./../admin.models').Image;
const Construction = require('./../admin.models').Construction;

/*------------------------------GET--------------------------------*/

Construction.getAllConstructionsWithImagesAndType = ( res, cb ) => {
  Construction.findAll({ 
    include: [
      { 
        model: Image,
        where: { statusItem: 0 } 
      },
      { model: Type  }
    ],
    where: { statusItem: 0 }
  })
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

Construction.getConstructionWidthImagesAndType = ( idConstruction, res, cb ) => {
  Construction.findOne({
    include: [
      { 
        model: Image,
        where: { statusItem: 0 } 
      },
      { model: Type  }
    ],
    where: [{ id: idConstruction }, { statusItem: 0 }]
  })
  .then( data => {
    if( data )
      return cb(null, res, data, 200)
    return cb('Construction does not exists', res)
  })    
  .catch( error => cb( error, res ) )
}

Construction.getConstructionsPerType = ( idType, res, cb ) => {
  Type.findOne({
    include:
    { 
      model: Construction,
      where: { statusItem: 0 },
      include : {
        model: Image,
        where: { statusItem: 0 }
      }
    },
    where: { id: idType }
  })
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

Construction.numberOfConstructions = ( num, res, cb ) => {
  Construction.findAll({ 
    include: [
      { 
        model: Image,
        where: { statusItem: 0 } 
      },
      { model: Type  }
    ],
    limit: +num,
    order: [ ['id', 'DESC'] ],
    where: { statusItem: 0 }
  })
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

Construction.getRelatedConstructions = ( num, typeId, res, cb ) => {
  Construction.findAll({ 
    include: [
      { 
        model: Image,
        where: { statusItem: 0 } 
      },
      { model: Type  }
    ],
    limit: +num,
    order: [ ['id', 'DESC'] ],
    where: { statusItem: 0, typeId }
  })
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

/*------------------------------POST--------------------------------*/

Construction.saveConstructionWithImages = ( newConstruction, images, idType, res, cb ) => {
  Type.findByPk(idType)
    .then( type => type.createConstruction(newConstruction))
    .then( construction => {
      imagesPromises = images.map( image => {
        return construction.createImage( image )
      }) 
      return Promise.all(imagesPromises);  
    })
    .then( () => cb(null, res, 'inserted', 201))
    .catch( error => cb( error, res ) )
}

/*------------------------------PUT--------------------------------*/

Construction.updateConstruction = ( idConstruction, mainImage, constructionUpdated, images, res, cb ) => {
  Construction.update( constructionUpdated, { where: { id: idConstruction } } )
  .then( () => Construction.findByPk( idConstruction ))
  .then( construction => {
    imagesPromises = images.map( image => {
      return construction.createImage(image)
    }) 
    return Promise.all(imagesPromises);  
  } )  
  .then( () => {   
    Image.updateMain( idConstruction, mainImage );
    cb(null, res, 'updated', 201)
  })
  .catch( error => cb( error, res ) )
}

/*------------------------------DELETE--------------------------------*/

Construction.deleteConstruction = ( idConstruction, res, cb ) => {
  Construction.update(
    { statusItem: 1 },
    { where: { id: idConstruction } }
  )
  .then( data => cb(null, res, data, 204))
  .catch( error => cb( error, res ) )
}

/*------------------------------METHODS--------------------------------*/

Construction.responseToClient = ( error, res, data, action ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(action).json(data);
}

module.exports = Construction;