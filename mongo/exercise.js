const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Successfully connected to database'))
    .catch(err => console.log('Failed to connect to database', err));

// Creating schema and model
const courseSchema = mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

//* Task 1 - fetching all data
async function fetchAllData() {
    const data = await Course.find({ isPublished: true, tags: 'backend' }).lean()
        .sort({ name: 1 })
        .select({ name: 1, author: 1, tags: 1 })
    console.log('All Data: ', data);
}

// fetchAllData();

//* Task 2 - sorting based on price
async function getPricesAndSort() {
    const data = await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .lean()
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
    console.log('Sorted Prices: ', data);
}

// getPricesAndSort();

//* Task 3 - expensive or by
async function getExpensiveOrByInName() {
    const data = await Course
        .find({ isPublished: true })
        .lean()
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }]);
        console.log(data);
}

// getExpensiveOrByInName();