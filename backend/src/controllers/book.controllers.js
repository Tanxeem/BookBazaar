import Book from "../models/book.models.js";

export const createBook = async (req, res) => {
  const {
    title,
    author,
    description,
    price,
    stock,
    genre,
    publishedYear,
    publisher,
    isbn,
    averageRating,
    numOfReviews,
  } = req.body;
    try {
        const bookData = {
      title,
    author,
    description,
    price,
    stock,
    genre,
    publishedYear,
    publisher,
    isbn,
    averageRating,
    numOfReviews,
      createdBy: req.user._id,
    };

    const book = await Book.create(bookData);

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Failed to create book",
      });
    }

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
    } catch (error) {
        console.log("creating book error",error)
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

// Get all books (public, supports filters)
export const getAllBooks = async (req, res) => {
    try {
        const { genre, author, minPrice, maxPrice, search, sort } = req.query;
        
        // Build query object
        const query = {};
        
        if (genre) query.genre = genre;
        if (author) query.author = { $regex: author, $options: 'i' };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Build sort object
        let sortOption = {};
        if (sort) {
            if (sort === 'price-asc') sortOption.price = 1;
            if (sort === 'price-desc') sortOption.price = -1;
            if (sort === 'rating-asc') sortOption.averageRating = 1;
            if (sort === 'rating-desc') sortOption.averageRating = -1;
            if (sort === 'newest') sortOption.createdAt = -1;
        }
        
        const books = await Book.find(query)
            .sort(sortOption)
            .limit(20);
            
        res.status(200).json({
            success: true,
            count: books.length,
            books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single book details
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        
        res.status(200).json({
            success: true,
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update book (Admin only)
export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        
        res.status(200).json({
            success: true,
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete book (Admin only)
export const DeleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};








