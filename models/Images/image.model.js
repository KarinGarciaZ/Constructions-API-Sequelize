const Image = require('./../admin.models').Image;

/*------------------------------GET--------------------------------*/

Image.getAllImages = ( res, cb ) => {
  Image.findAll()
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

/*------------------------------PUT--------------------------------*/

Image.deleteImages = ( images, res, cb ) => {
  let promises = images.map(id => {
    return Image.update({ statusItem: 1 }, { where : { id }})
  });
  
  Promise.all(promises)
  .then( data => cb(null, res, data, 200))
  .catch( error => cb( error, res ) )
}

Image.updateMain = ( constructionId, mainImage ) => {
  Image.update({ mainImage: 0 }, { where: { constructionId } })
  .then( () => Image.findAll( { where: { statusItem: 0, constructionId }}))
  .then( images => {
    Image.update({ mainImage: 1 }, { where: { id: images[mainImage].dataValues.id }})
  })
}

/*------------------------------METHODS--------------------------------*/

Image.responseToClient = ( error, res, data, action ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(action).json(data);
}

module.exports = Image;