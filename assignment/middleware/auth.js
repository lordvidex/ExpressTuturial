const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('X-Auth-Token');
    if (!token) return res.status(401).send('Access Denied! Token not provided');

    // if token exists, verify this token
    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).send('Invalid token');
    }
}