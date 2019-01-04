const Type = require('./../admin.models').Type;

Type.getAllTypes = ( res, cb ) => {
  Type.findAll()
  .then( data => cb( null, res, data, 200 ) )
  .catch( error => cb( error, res ))
}

Type.saveType = ( newTypeName, res, cb ) => {
  Type.create({ name: newTypeName, statusItem: 0 })
  .then( data => cb( null, res, data, 201 ))
  .catch( error => cb( error, res ))
}

Type.updateType = ( type, res, cb ) => {
  Type.update({ name: type.name }, { where: { id: type.id } })
  .then( data => cb( null, res, data, 201 ))
  .catch( error => cb( error, res ))
}

Type.responseToClient = ( error, res, data, action ) => {
  if ( error )
    res.status(500).json(error);
  else
    res.status(action).json(data);
}

module.exports = Type;