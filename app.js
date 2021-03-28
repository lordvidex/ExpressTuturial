const startupDebugger = require('debug')('app:startup');
const logger = require('./middleware/logger');

const helmet = require('helmet');
const config = require('config');
const express = require('express');
const app = express();

//! Routes
const courses = require('./routes/courses');
const home = require('./routes/home');

startupDebugger('App has started ...');
// logger.log('process.env.NODE_ENV: '+process.env.NODE_ENV);
// logger.log('app.env: '+app.get('env'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);

const port = process.env.PORT || 3000;

console.log('Application Name: '+config.get('name'))

app.listen(port, () => {
    logger.log(`Listening on port ${port}...`);
});