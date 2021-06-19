const express = require('express');
const router = express.Router();
const { forecast, current, location, v1 } = require("../controllers/controllers")
/*set DEBUG=myapp:* & npm start*/
router.get('/v1', v1);

router.get('/location', location);

router.get('/current', current);

router.get('/forecast', forecast);

module.exports = router;
