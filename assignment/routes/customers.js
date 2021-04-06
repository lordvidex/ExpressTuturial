const { Customer, validate, getCustomerWithId } = require('../models/customer');
const express = require('express');

const router = express.Router();

//! get
router.get('/', async (_, res) => {
    const customers = await Customer.find().lean();
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await getCustomerWithId(req.params.id);
    if (!customer) {
        res.status(403).send('Invalid customer id');
        return;
    }
    res.send(customer);
});

//! post
router.post('/', async (req, res) => {
    const { value, error } = validate(req.body);
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    let customer = new Customer(value);
    customer = await customer.save();
    res.send(customer);
})

//! put
router.put('/:id', async (req, res) => {
    //validate the id provided
    const customer = await getCustomerWithId(req.params.id);
    if (!customer) {
        res.status(403).send('Invalid customer id');
        return;
    }

    // validate the body
    const { value, error } = validate(req.body);
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    console.log(value);
    const result = await Customer.findByIdAndUpdate(req.params.id, value, { new: true });
    console.log(result);
    res.send(result);
})

//! delete
router.delete('/:id', async (req, res) => {

    try {
        const result = await Customer.findByIdAndDelete(req.params.id).lean();
        res.send(result);
    } catch (e) {
        // there was an error with the id
        res.status(400).send('Invalid customer id');
    }
})

module.exports = router;