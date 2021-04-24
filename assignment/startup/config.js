const config = require('config');

module.exports = function () {
    // check if configs were properly set and exit with error code 1 
    // if not set
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}