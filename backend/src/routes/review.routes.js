import express from "express";
import { createReview, deleteReview, getBookReviews } from "../controllers/review.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import verifyApikey from "../middleware/apikey.middleware.js";


const reviewsRouter = express.Router();

reviewsRouter.post("/:bookId/create", authMiddleware, createReview);
reviewsRouter.get("/getbookreviews/:bookd",verifyApikey, getBookReviews);
reviewsRouter.delete("/deletereview/:id", authMiddleware, deleteReview);

export default reviewsRouter;