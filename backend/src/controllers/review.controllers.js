import Review from "../models/review.models.js";
import Book from "../models/book.models.js";


export const createReview = async (req, res) => {
    try {
        const {rating, title, comment} = req.body;
        const {bookId} = req.params;
        console.log("Book id",bookId);
        const book = await Book.findById(bookId);
        if(!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        const alReadyReview = await Review.findOne({
            book: bookId,
            user: req.user._id
        });
        if(alReadyReview){
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this book"
            });
        }

        const review = await Review.create({
            rating,
            title,
            comment,
            book: bookId,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            review
        });
            
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getBookReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });
            
        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }
        
        // Check if user is the owner of the review
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to delete this review"
            });
        }
        
        await review.remove();
        
        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}