const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const { Rental, validateRentals } = require('../models/rental');
const { getCustomerWithId } = require('../models/customer');
const { getMovieWithId } = require('../models/movie');
const router = express.Router();

// fawn for handling transactions
Fawn.init(mongoose);

//! get
router.get('/', async (_, res) => {
    const rentals = await Rental.find().sort('-dateOut').lean();
    res.send(rentals);
});

//! post
router.post('/', async (req, res) => {
    const { error, value } = validateRentals(req.body);

    // client side validations
    if (error) {
        res.status(400).send(error.message);
        return;
    }

    // check if customer exists
    const customer = await getCustomerWithId(value.customerId);
    if (!customer) {
        res.status(404).send(`Customer with id ${value.customerId} not found`);
        return;
    }

    // check if movie exists
    const movie = await getMovieWithId(value.movieId);
    if (!movie) {
        res.status(404).send(`Movie with id ${value.movieId} not found`);
        return;
    }else if (movie.numberInStock < 1){
        res.status(409).send('Movie not in stock');
        return ;
    }

    // create Rental
    const rental = new Rental({
        customer: {
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold,
            _id: customer._id
        },
        movie: {
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            _id: movie._id,
        },
    });
    try {
        Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();
        res.send(rental);
    } catch (_) {
        res.status(500).send('An error occured!');
    }
});


module.exports = router;