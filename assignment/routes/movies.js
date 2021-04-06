const express = require('express');
const { findGenreWithId } = require('../models/genre');
const { Movie, validateMovie, validateUpdate, getMovieWithId } = require('../models/movie');
const router = express.Router();

//! get routes
router.get('/', async (_, res) => {
    const movies = await Movie.find().lean();
    res.send(movies);
});

router.get('/:id', async (_, res) => {
    const movie = await getMovieWithId();
    if (!movie) {
        res.status(404).send('Movie not found');
        return;
    }
    res.send(movie);
})

//! post routes
router.post('/', async (req, res) => {
    // validate body
    const { error, value } = validateMovie(req.body);
    if (error) {
        res.status(403).send(error.message);
        return;
    }

    // get the genre from it's id
    const genre = await findGenreWithId(value.genreId);
    if (!genre) {
        res.status(403).send(`Genre id is invalid`);
        return;
    }

    // create model and save to database
    const movie = new Movie({
        title: value.title,
        genre: {
            _id: genre._id,
            genre: genre.genre
        },
        numberInStock: value.numberInStock,
        dailyRentalRate: value.dailyRentalRate
    });

    const result = await movie.save();
    res.send(result);
});

//! put routes
router.put('/:id', async (req, res) => {
    // check if id is valid
    const movie = await getMovieWithId(req.params.id);
    if (!movie) {
        res.status(403)
            .send(`Movie with id ${req.params.id} not found`);
        return;
    }

    // validate body.. NB: not all fields should be required 
    // during update, hence we need a new function for PUT
    const { error, value } = validateUpdate(req.body);
    if (error) {
        req.status(403).send(error.message);
        return;
    }

    // if genre was provided, do a lookup for genre
    let genre;
    if (value.genreId) {
        genre = await findGenreWithId(value.genreId);
        if (!genre) {
            res.status(404).send(`Genre with id ${value.genreId} not found`);
            return;
        }
    }

    const newMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: value.title,
            genre: {
                _id: genre?._id,
                genre: genre?.genre
            },
            numberInStock: value.numberInStock,
            dailyRentalRate: value.dailyRentalRate
        },
        { new: true }).lean();

    res.send(newMovie);
});

//! delete routes
router.delete('/:id', async (req, res) => {
    const movie = await getMovieWithId(req.params.id);
    if (!movie) {
        res.status(404).send(`Movie with id ${req.params.id} not found`);
        return;
    }
    return await Movie.findByIdAndRemove(req.params.id).lean();
})


module.exports = router;