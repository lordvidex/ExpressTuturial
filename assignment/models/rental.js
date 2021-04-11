const mongoose = require('mongoose');
const Joi = require('joi');
const { customerSchema } = require('./customer');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minLength: 3,
                maxLength: 255,
                required: true,
                trim: true,
            },
            dailyRentalRate: {
                type: Number,
                default: 0,
                min: 0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

/* Rental Object */
const Rental = mongoose.model('Rental',rentalSchema);


/**
 * @param {Object} rental containing customerId and movieId
 * @returns JoiValidationObject {error, value}
 */
function validateRentals(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}



exports.Rental = Rental;
exports.validateRentals = validateRentals;