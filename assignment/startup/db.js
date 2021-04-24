const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    //! start database
    mongoose.set('debug', true);
    mongoose.connect(
        'mongodb://localhost/vidly',
        {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => winston.info('Successfully connected to the Database.. '))
        
}