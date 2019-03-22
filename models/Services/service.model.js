const Service = require('../admin.models').Service;

Service.getServices = ( res, cb ) => {
  Service.findAll( { where: { statusItem: 0 } } )
  .then( services => cb( null, res, services, 200 ) )
  .catch( error => cb( error, res ) )
}

Service.saveService = ( newService, res, cb ) => {
  Service.create( newService )
  .then( data => cb( null, res, data, 201 ) )
  .catch( error => cb( error, res ) )
}

Service.updateService = ( idService, updatedService, res, cb ) => {

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
    res.status(5000).json(error)
  else
    res.status(status).json(data)
}

module.exports = Service;