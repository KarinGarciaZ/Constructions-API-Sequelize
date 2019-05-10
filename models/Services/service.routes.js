const app = require('express');
const router = app.Router();

const cloudinary = require('../../handlers/cloudinary')
const upload = require('../../handlers/multer-configuration');

const Service = require('./service.model');
const userAuth = require('../../auth/userAuth');

router

.get('/getCounters', ( req, res ) => {
  return Service.getCounters( res, Service.responseToClient )
})

.get('/', ( req, res ) => {
  return Service.getServices(res, Service.responseToClient);
})

.get('/:id', ( req, res ) => {
  let id = req.params.id;
  return Service.getService(id, res, Service.responseToClient);
})

.post('/', userAuth, upload.single('image'), async ( req, res ) => {

  let serviceData = JSON.parse(req.body.serviceData);
  
  let result = await cloudinary.v2.uploader.upload(req.file.path)

  let newService = {
    name: serviceData.name,
    image: result.secure_url,
    description: serviceData.description,
    statusItem: 0
  }

  return Service.saveService( newService, res, Service.responseToClient )
})

.put('/', userAuth, upload.single('image'), async ( req, res ) => {
  let serviceData = JSON.parse(req.body.serviceData);

  let id = serviceData.id;
  
  let serviceEdited = {
    name: serviceData.name,
    description: serviceData.description
  }

  if( req.file ) { 
    let result = await cloudinary.v2.uploader.upload(req.file.path)
    serviceEdited.image = result.secure_url
  }

  return Service.updateService( id, serviceEdited, res, Service.responseToClient )
})

.delete('/:id', userAuth, ( req, res ) => {
  let idService = req.params.id;
  Service.deleteService( idService, res, Service.responseToClient )
})

module.exports = router;