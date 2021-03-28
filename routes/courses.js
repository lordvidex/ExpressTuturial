const Joi = require('joi');
const express = require('express');
const router = express.Router();

//! data
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

//! get 
router.get('/', (req, res) => {
    res.send(courses);
});
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`The course with id '${req.params.id}' not found`);
    res.send(course);
})

//! post 
router.post('/', (req, res) => {
    // validations
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        res.end();
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

//! put 
router.put('/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // If not existing, return 404
    if (!course) res.status(404).send('The course with the given ID was not found');

    // Validate
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error, value } = schema.validate(req.body);

    // If invalid, return 400, bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        res.end();
    }
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
})

//! delete routes
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(400).send('The course was not found');

    // remove the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the deleted course to the user
    res.send(course);
});

module.exports = router;