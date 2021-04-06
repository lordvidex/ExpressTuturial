const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

// author is embedded into course and updating an author has to be
// done from within a course because it is not a standalone
// object
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
// listCourses();

//* updating an embedded author
async function updateCourse() {
    let course = await Course.findById('606b822e0f40f23aed928872');
    course.author.name = 'Evans';
    course = await course.save();
    console.log(course);
}

updateCourse();
