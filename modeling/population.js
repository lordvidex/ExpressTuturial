const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}
// we can populate a field with the details of it's objectId
// when querying
// for populate options:-
//  '-' before a key means do not include
// you can also specifically add keys you want 
async function listCourses() {
    const courses = await Course
        .find()
        .populate('author','-_id -__v')
        .select('name');
        
    console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '606b790618409021c9b3b16c')
 listCourses();