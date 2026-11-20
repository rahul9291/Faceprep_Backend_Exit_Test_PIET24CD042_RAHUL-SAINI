const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  author: { type: String, required: [true, 'Author is required'], trim: true },
  price: { type: Number, required: true, min: [1, 'Price must be at least 1'] },
  category: { type: String, trim: true, default: 'General' },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
