const mongoose = require('mongoose');

// allow debuggers
mongoose.set('debug', true);

// create the connection
mongoose.connect('mongodb://localhost/courses-db')
    .then(() => console.log('Successfully connected to Database...'))
    .catch(err => console.log('Failed to connect to database', err));

// create the Course schema
const courseSchema = new mongoose.Schema({
    id: Number,
    name: String,
});

// create a model from the schema
const Course = mongoose.model('Course', courseSchema);

// export it for use
module.exports = Course;