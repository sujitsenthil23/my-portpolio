const reviews = [
  {
    id: 1,
    name: 'Client Name',
    rating: 5,
    text: 'Reliable, fast delivery and clean code. Great communication throughout.',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Client Name',
    rating: 4,
    text: 'Strong technical skills and a professional workflow. Recommended.',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Client Name',
    rating: 5,
    text: 'Delivered a polished experience with thoughtful details.',
    createdAt: new Date().toISOString()
  }
];

const getReviews = (req, res) => {
  res.status(200).json({ success: true, data: reviews });
};

const addReview = (req, res) => {
  const { name, rating, text } = req.body;

  if (!name || !rating || !text) {
    return res.status(400).json({
      success: false,
      message: 'Name, rating, and text are required.'
    });
  }

  const review = {
    id: reviews.length + 1,
    name,
    rating: Number(rating),
    text,
    createdAt: new Date().toISOString()
  };

  reviews.push(review);

  res.status(201).json({ success: true, data: review });
};

module.exports = { getReviews, addReview };
