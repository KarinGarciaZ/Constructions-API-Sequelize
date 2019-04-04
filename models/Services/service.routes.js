const app = require('express');
const router = app.Router();

const upload = require('./multer-configuration');
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

.post('/', userAuth, upload, ( req, res ) => {

  let serviceData = JSON.parse(req.body.serviceData);

  let newService = {
    name: serviceData.name,
    image: req.file.filename,
    description: serviceData.description,
    statusItem: 0
  }

  return Service.saveService( newService, res, Service.responseToClient )
})

.put('/', userAuth, upload, ( req, res ) => {
  let serviceData = JSON.parse(req.body.serviceData);
  console.log(serviceData)
  let id = serviceData.id;
  
  let serviceEdited = {
    name: serviceData.name,
    description: serviceData.description
  }

  if( req.file )
    serviceEdited.image = req.file.filename

  return Service.updateService( id, serviceEdited, res, Service.responseToClient )
})

.delete('/:id', userAuth, ( req, res ) => {
  let idService = req.params.id;
  Service.deleteService( idService, res, Service.responseToClient )
})

module.exports = router;