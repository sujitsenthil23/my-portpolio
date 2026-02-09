const router = require('express').Router();
const { getReviews, addReview } = require('../controllers/reviewController');

router.get('/', getReviews);
router.post('/', addReview);

module.exports = router;
