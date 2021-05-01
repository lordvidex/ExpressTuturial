const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const router = require('express').Router();

router.use('/',swaggerUI.serve);
router.get('/',swaggerUI.setup(swaggerDoc));
module.exports = router;