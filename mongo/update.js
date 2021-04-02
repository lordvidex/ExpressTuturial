const mongoose = require('mongoose');

// connect to mongodb
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/mongo-exercises', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to database'))
    .catch(err => console.log('Failed to connect to database', err));

// Creating schema and model
const courseSchema = new mongoose.Schema({
    _id: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

// updating a course
// First approach - Query first
async function updateWithId(id) {


    const course = await Course.findOne({ _id: id });
    if (!course) {
        console.log('not found!');
        return;
    }
    course.author = "Skreen MONGER"
    course.name = `Node.js Course by ${course.author}`;
    return await course.save();
}

// Second approach - Update first method
async function updateWithIdUpdateFirst(id) {
    const course = await Course
        .findOneAndUpdate({ _id: id }, { name: 'Node.js Course by Lordvidex', author: 'Lordvidex' });
    return course;
}
async function run() {
    //const answer = await updateWithId("5a68fe2142ae6a6482c4c9cb");
    const answer = await updateWithIdUpdateFirst('5a68fe2142ae6a6482c4c9cb');
    console.log(answer);
}
run();
