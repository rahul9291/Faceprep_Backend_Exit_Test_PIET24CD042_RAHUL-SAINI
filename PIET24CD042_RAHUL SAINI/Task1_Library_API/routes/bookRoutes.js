const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const router = express.Router();

// POST /books - create a book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, price, category, isAvailable } = req.body;
    if (!title || !author || price === undefined || Number(price) < 1) {
      return res.status(400).json({ message: 'title, author and price (minimum 1) are required' });
    }
    const book = await Book.create({ title, author, price, category, isAvailable });
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (err) { next(err); }
});

// GET /books - list all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ count: books.length, books });
  } catch (err) { next(err); }
});

// GET /books/:id - get one book
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid book ID' });
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) { next(err); }
});

// PUT /books/:id - update a book
router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid book ID' });
    if (req.body.price !== undefined && Number(req.body.price) < 1) {
      return res.status(400).json({ message: 'Price must be at least 1' });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (err) { next(err); }
});

// DELETE /books/:id - delete a book
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid book ID' });
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully', book });
  } catch (err) { next(err); }
});

module.exports = router;
