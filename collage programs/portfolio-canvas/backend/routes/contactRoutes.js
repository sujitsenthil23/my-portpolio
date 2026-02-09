const router = require('express').Router();
const { handleContact } = require('../controllers/contactController');

router.post('/', handleContact);

module.exports = router;
