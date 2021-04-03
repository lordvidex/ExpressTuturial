const Joi = require('joi');
const Course = require('./model/course');
const express = require('express');
const router = express.Router();


//! get 
router.get('/', async (req, res) => {
    const courses = await getAllCourse();
    res.send(courses);
});
router.get('/:id', async function (req, res) {
    const course = await getCourseWithId(req.params.id);
    if (!course) {
        res.status(404).send(`The course with id '${req.params.id}' not found`);
        return;
    }
    res.send(course);
})

//! post 
router.post('/', async (req, res) => {
    // validations
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // adding the course
    const updatedCourse = await postCourse(req.body.name);
    if (!updatedCourse) {
        res.status(403).send('Bad request');
        return;
    }
    res.send(updatedCourse);
})

//! put 
router.put('/:id', async (req, res) => {
    // Look up the course
    var course = await getCourseWithId(req.params.id);

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
        return ;
    }
    // Return the updated course
    course = await updateCourseWithId(course.id, req.body);
    res.send(course);
})

// //! delete routes
router.delete('/:id', async (req, res) => {
    const course = await getCourseWithId(req.params.id);
    if (!course) {
        res.status(400).send('The course was not found');
        return;
    }

    // remove the course
    const result = await removeCourseWithId(req.params.id);

    // return the deleted course to the user
    res.send(result);
});


//! database functions

async function removeCourseWithId(id) {
    return await Course.deleteOne({ id: id });
}

async function updateCourseWithId(id, body) {
    return await Course.updateOne({ id: id }, { id: id, name: body.name });
}

async function postCourse(name) {
    const length = (await Course.find().lean()).length;
    const course = new Course({
        id: length + 1,
        name: name
    });

    return await course.save();
}

async function getAllCourse() {
    return await Course.find().lean();
}

async function getCourseWithId(id) {
    return await Course.findOne({ id: id }).lean();
}

module.exports = router;