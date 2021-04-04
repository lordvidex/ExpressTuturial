const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    phone: {
        type: String,
        minLength: 5,
        maxLength: 16,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        phone: Joi.string().min(5).max(16).pattern(/\+?[\d\(\)]+/),
        isGold: Joi.boolean()
    });
    return schema.validate(body);
}

exports.Customer = Customer;
exports.validate = validateCustomer;