const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My First App',
        message: 'Basically, this is my first express app.. ggs!!'
    });
    res.end();
});

module.exports = app;