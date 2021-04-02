const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres',genres);

//! globals
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));