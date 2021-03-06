const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    // configure winston loggers
    winston
        .add(new winston.transports.File({
            filename: 'logfile.log',
        }))
        .add(new winston.transports.MongoDB({
            db: config.get('db'),
            options: { useUnifiedTopology: true, },
            level: 'info'
        }))
        .add(new winston.transports.Console())
        .exceptions.handle(
            new winston.transports.Console({ colorize: true, prettyPrint: true }),
            new winston.transports.File({ filename: 'exceptions.log' }));
}