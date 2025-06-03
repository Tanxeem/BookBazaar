import Book from "../models/book.models.js";

export const createBook = async (req, res) => {
    try {
        const bookData = {
      ...req.body,
      createdBy: req.user._id
    };

    const book = await Book.create(bookData);

    res.status(201).json({
      success: true,
      data: book,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("createdBy", "name email");
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("createdBy", "name email");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user is admin or the book creator
    if (req.user.role !== "admin" && book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this book",
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: book,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const DeleteBook =async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user is admin or the book creator
    if (req.user.role !== "admin" && book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
    } catch (error) {
        
    }
}








