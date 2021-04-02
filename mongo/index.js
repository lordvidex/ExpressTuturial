const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB.. ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const course1 = new Course({
    name: 'Course 2',
    author: 'LordVidex',
    tags: ['Java', 'C++', 'Dart'],
    isPublished: true
});

//! adding to the database
async function saveToDB(course) {
    const result = await course.save();
    console.log(result);
}

// saveToDB(course1);

//! querying the database
async function getCourses() {
    const courses = await Course
    .find().sort({author: -1});
    console.log(courses);
}
getCourses();