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

//! functions
function validateCustomer(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        phone: Joi.string().min(5).max(16).pattern(/\+?[\d\(\)]+/),
        isGold: Joi.boolean()
    });
    return schema.validate(body);
}

/**
 * @param {*id} id of customer
 * @returns null if id is invalid or customer if id is valid
 */
 async function getCustomerWithId(id) {
    try {
        return await Customer.findById(id).lean();
    } catch (e) {
        return null;
    }
}

exports.Customer = Customer;
exports.customerSchema = customerSchema;
exports.validate = validateCustomer;
exports.getCustomerWithId = getCustomerWithId;