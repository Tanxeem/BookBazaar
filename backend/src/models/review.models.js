import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
        required: [true, 'Rating is required'],
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true,
    },
}, { timestamps: true });

// Prevent user from submitting more than one review per book
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Static method to calculate average rating and update book
reviewSchema.statics.calculateAverageRating = async function (bookId) {
  const result = await this.aggregate([
    { $match: { book: bookId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model('Book').findOneAndUpdate(
      { _id: bookId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.book);
});

reviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.book);
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;