const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({
      title,
      author,
      description,
      publishedYear,
      createdBy: req.user.userId,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
