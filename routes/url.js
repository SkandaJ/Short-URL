const express =  require('express');
const {handlegenerateShortURL} = require('../controllers/url');
const router = express.Router();
router.post('/', handlegenerateShortURL);
module.exports = router;