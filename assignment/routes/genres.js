const express = require('express');
const Joi = require('joi');
const router = express.Router();

//! Data
const genres = [
    'Rock', 'Pop', 'Hip-Hop'
];
router.get('/', (_, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    // validate if the user entered a valid genre

    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        genres.push(req.body.genre);
        res.send(req.body.genre);
    }
    res.end();
});

router.delete('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
        const index = genres.indexOf(req.body.genre);
        if (index === -1) {
            res.status(404).send(`Genre ${req.body.genre} does not exist!`);
            res.end();
            return;
        }
        // get the genre
        const deletedGenre = genres[index];
        // delete
        genres.splice(index, 1);
        // send the deleted data
        res.send(deletedGenre);
    }
});

//! Functions
function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(3).max(15).required()
    });
    return schema.validate(genre);
}

module.exports = router;