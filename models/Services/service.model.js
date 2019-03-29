const Service = require('../admin.models').Service;

Service.getServices = ( res, cb ) => {
  Service.findAll( { where: { statusItem: 0 } } )
  .then( services => cb( null, res, services, 200 ) )
  .catch( error => cb( error, res ) )
}

Service.getService = ( id, res, cb ) => {
  Service.findById( id )
  .then( service => {
    if (service)
      return cb( null, res, service, 200 )
    return cb('Service does not exists', res)
  } )
  .catch( error => cb( error, res ) )
}

Service.saveService = ( newService, res, cb ) => {
  Service.create( newService )
  .then( data => cb( null, res, data, 201 ) )
  .catch( error => cb( error, res ) )
}

Service.updateService = ( idService, updatedService, res, cb ) => {
  Service.update( updatedService, { where: { id: idService } } )
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ) )
}

Service.deleteService = ( idService, res, cb ) => {
  Service.update( 
    { statusItem: 1 }, 
    { where: { id: idService } } )
  .then( () => cb( null, res, {}, 204 ) )
  .catch( error => cb( error, res ) )
}

Service.responseToClient = ( error, res, data, status ) => {
  if( error )
    res.status(500).json(error)
  else
    res.status(status).json(data)
}

module.exports = Service;