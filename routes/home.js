const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.send('Hello world!!!');
    res.end();
});

module.exports = app;