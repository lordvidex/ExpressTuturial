const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const genres = require('./routes/genres');

const app = express();

app.use(express.json());
app.use(helmet());

//! Routes
app.use('/api/genres',genres);

//! start database
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Successfully connected to the Database.. '))
.catch(err=>console.error('There was an error connecting to the db', err));

//! globals
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));