const app = require('express');
const router = app.Router();

const upload = require('./multer-configuration');
const Service = require('./service.model');
const userAuth = require('../../auth/userAuth');

router
.get('/', ( req, res ) => {
  return Service.getServices(res, Service.responseToClient);
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

.put('/', ( req, res ) => {

})

.delete('/:id', ( req, res ) => {
  let idService = req.params.id;
  Service.deleteService( idService, res, Service.responseToClient )
})

module.exports = router;