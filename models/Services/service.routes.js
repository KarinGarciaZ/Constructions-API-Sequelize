const app = require('express');
const router = app.Router();

const upload = require('./multer-configuration');
const Service = require('./service.model');

router
.get('/', ( req, res ) => {
  return Service.getServices(res, Service.responseToClient);
})

.post('/', upload, ( req, res ) => {

  let serviceData = JSON.parse(req.body.serviceData);

  let newService = {
    name: serviceData.name,
    image: req.file.filename,
    description: serviceData.description,
    statusItem: 0
  }

  return Service.saveService( newService, res, Service.responseToClient )
})

.put('/:id', ( req, res ) => {

})

.delete('/:id', ( req, res ) => {

})

module.exports = router;