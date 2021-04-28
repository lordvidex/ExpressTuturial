const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
module.exports = function () {
    //! start database
    const db = config.get('db');
    if(process.env.NODE_ENV !== 'test') 
        mongoose.set('debug', true);
    mongoose.connect(
        db,
        {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => winston.info(`Successfully connected to the ${db}.. `))
        
}