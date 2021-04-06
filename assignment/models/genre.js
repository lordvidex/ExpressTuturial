const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        minLength: 3,
        maxLength: 15,
        trim: true,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(3).max(15).required()
    });
    return schema.validate(genre);
}

async function findGenreWithId(id) {
    try {
        return await Genre.findById(id).lean();
    } catch (e) {
        return null;
    }
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
exports.findGenreWithId = findGenreWithId;
