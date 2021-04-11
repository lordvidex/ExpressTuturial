const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send('Invalid email or password');

    // check if email exists
    let user = await User.findOne({ email: value.email });
    if (!user) return res.status(400).send('Invalid email or password');

    // check if the password entered is correct
    const passwordIsEqual = await bcrypt.compare(value.password, user.password);
    if (!passwordIsEqual) return res.status(400).send('Invalid email or password');

    // email and password are both correct, return token in header
    const token = user.generateAuthToken();
    res.header('X-Auth-Token',token).send('Successfully logged in');
});

function validate(body) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(body);
}

module.exports = router;