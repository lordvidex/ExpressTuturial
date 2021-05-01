const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const documentation = require('../routes/documentation');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    
    app.use(express.json());
    app.use(helmet());
    app.use(compression());

    //! api routes
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/',documentation);

    //! error route
    app.use(error);
}