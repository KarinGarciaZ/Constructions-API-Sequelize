const environment = process.env.ENVIRONMENT;
let host;
let port;

switch (environment) {
  case 'local':
    host = process.env.EXPRESS_HOST;
    port = process.env.PORT;
    break;
  case 'production':
    host = null;
    port = process.env.PORT || 3000;
    break;

  default:
    console.log('None Environment matched.');
    break;
}

module.exports = { host, port };