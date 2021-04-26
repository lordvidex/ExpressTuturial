const mongoose = require('mongoose');

function validateObjectId(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send('Invalid id provided');
    }
    next();
}

module.exports = validateObjectId;