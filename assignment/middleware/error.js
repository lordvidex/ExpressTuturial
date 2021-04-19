const winston = require('winston');

module.exports = async (err, req, res, next) => {
    // logging to winston
    winston.error(err.message, err);
    //if(err.name === 'internal_server_error'){  
    res.status(500).json({ error: { message: err.message, name: err.name } });
    //}
    next();
}