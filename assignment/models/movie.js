const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
        trim: true,
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        $set: v => Math.round(v),
        $get: v => Math.round(v),
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
});

//! Movie model
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().integer(),
        dailyRentalRate: Joi.number()
    });
    return schema.validate(movie);
}

function lazyValidate(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255),
        genreId: Joi.objectId(),
        numberInStock: Joi.number().integer(),
        dailyRentalRate: Joi.number()
    });
    return schema.validate(movie);
}

async function getMovieWithId(id) {
    try {
        return await Movie.findById(id).lean();
    } catch (_) {
        return null;
    }
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.validateUpdate = lazyValidate;
exports.getMovieWithId = getMovieWithId;