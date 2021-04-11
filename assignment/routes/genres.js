const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Genre, validate, findGenreWithId } = require('../models/genre');

const router = express.Router();

router.get('/', async (_, res) => {
    res.send(await Genre.find().lean());
});

router.get('/:id', async (req, res) => {
    const genre = await findGenreWithId(req.params.id);
    if (!genre) {
        res.status(404).send(`Genre with id ${req.params.id} not found`);
    } else {
        res.send(genre);
    }
});

router.post('/',auth, async (req, res) => {
    // validate if the user entered a valid genre
    const { error, value } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // validations have been passed save to db
    let genre = new Genre({ genre: value.genre });
    console.log(genre);
    genre = await genre.save();
    res.send(genre);
});

router.delete('/:id',auth, admin, async (req, res) => {
    // look for the genre with that id in the db

    const deletedGenre = await findGenreWithId(req.params.id);
    if (!deletedGenre) {
        res.status(404).send(`The genre with id ${req.params.id} was not found!`);
        return;
    }
    // delete the genre
    const result = await Genre.findByIdAndDelete(req.params.id).lean();
    res.send(result);

});

router.put('/:id',auth, async (req, res) => {
    let genre = await findGenreWithId(req.params.id);
    if (!genre) {
        res.status(404).send(`The genre with id ${req.params.id} was not found!`);
        return;
    }

    // validate the body
    const { error, value } = validate(req.body);
    if (error) {
        res.status(400).send(error.message);
        return;
    }

    // update the genre
    const result = await Genre.findByIdAndUpdate(req.params.id, value, { new: true }).lean();
    res.send(result);
})

module.exports = router;