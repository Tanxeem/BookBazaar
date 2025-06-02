const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide book title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  author: {
    type: String,
    required: [true, 'Please provide author name'],
    trim: true,
    maxlength: [50, 'Author name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide book description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide book price'],
    min: [0, 'Price cannot be negative'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },
  genre: {
    type: String,
    required: [true, 'Please provide book genre'],
    enum: [
      'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
      'Mystery', 'Thriller', 'Romance', 'Biography', 
      'History', 'Self-Help', 'Poetry', 'Drama'
    ],
  },
  publishedYear: {
    type: Number,
    required: [true, 'Please provide published year'],
  },
  publisher: {
    type: String,
    required: [true, 'Please provide publisher name'],
  },
  isbn: {
    type: String,
    required: [true, 'Please provide ISBN'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^(?:\d{9}[\dXx]|\d{13})$/.test(v);
      },
      message: props => `${props.value} is not a valid ISBN!`
    },
  },
  averageRating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;