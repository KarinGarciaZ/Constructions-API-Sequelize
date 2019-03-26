const Sequelize = require('sequelize');
const sequelize = require('../db_config/mysql-connection');

/*-----------CREATING MODELS----------- */

const Construction = sequelize.define('construction', {
  title: Sequelize.STRING,
  description: Sequelize.STRING(2000),
  statusConstruction: Sequelize.STRING(20),
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  startDate: Sequelize.DATE,
  finishDate: Sequelize.DATE,
  statusItem: Sequelize.INTEGER
})

const Service = sequelize.define('service', {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  description: Sequelize.STRING(2000),
  statusItem: Sequelize.INTEGER
})

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true },
    unique: true
  },
  phoneNumber: Sequelize.STRING,
  password: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
});

const Image = sequelize.define('image', {
  url: Sequelize.STRING(1000),
  statusItem: Sequelize.INTEGER,
  mainImage: Sequelize.INTEGER
})

const Type = sequelize.define('type', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  statusItem: Sequelize.INTEGER
});

const Code = sequelize.define('code', { 
  statusItem: Sequelize.INTEGER,
  code: Sequelize.INTEGER
})


/*-----------CREATING RELATIONS----------- */

Construction.belongsTo( Type );
Type.hasMany(Construction);
Image.belongsTo(Construction);
Construction.hasMany(Image);
Code.belongsTo(User);
User.hasMany(Code);


/*--GENERETE TABLES AND RELATIONS IF THESE DOESN'T EXIST--*/

sequelize.sync()
.then( () => console.log('DATABASE READY TO WORK'))
.catch( error => console.log('ERROR CONNECTING TO THE DATABASE: --->', error))


module.exports = { User, Type, Construction, Image, Code, Service };