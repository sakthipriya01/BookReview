const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const existingReview = await Review.findOne({ book: bookId, user: req.user.userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book.' });
    }

    const review = new Review({
      book: bookId,
      user: req.user.userId,
      rating,
      comment,
    });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
