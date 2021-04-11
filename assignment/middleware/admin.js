module.exports = 
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */
function (req, res, next) {
    if(!req.user.isAdmin) return res.status(403).send('Access denied!');
    else next();
}