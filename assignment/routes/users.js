const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { validate, User } = require('../models/user');
const router = express.Router();

//! getting the current user
router.get('/me', auth, async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password').lean();
    res.send(user);
})
//! signing a new user
router.post('/', async (req, res) => {
    const { error, value } = validate(req.body);

    // validate user-entered data
    if (error) return res.status(400).send(error.message);

    // check if user already exists
    let user = await User.findOne({ email: value.email });
    if (user) return res.status(400).send('User already exists');

    // create a new user
    user = new User(value);

    // hash user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // save user to db and send only name,email and id back to client
    await user.save();

    // send user jwt and public details
    const token = user.generateAuthToken();
    res.header('X-Auth-Token', token).send(_.pick(user, ['name', 'email', '_id']));
});
module.exports = router;