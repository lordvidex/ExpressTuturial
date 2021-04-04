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

exports.Genre = Genre;
exports.validate = validateGenre;
