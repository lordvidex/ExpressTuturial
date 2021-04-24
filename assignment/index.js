const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logger')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

//! globals
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));