const mongoose = require('mongoose');

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

module.exports = Genre;
