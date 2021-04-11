const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth  = require('./routes/auth');

const app = express();

// check if configs were properly set and exit with error code 1 
// if not set
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

app.use(express.json());
app.use(helmet());

//! Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

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
    .then(() => console.log('Successfully connected to the Database.. '))
    .catch(err => console.error('There was an error connecting to the db', err));

//! globals
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));