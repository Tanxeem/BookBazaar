import express from "express";
import { createReview, deleteReview, getBookReviews } from "../controllers/review.controllers";
import authMiddleware from "../middleware/auth.middleware.js";


const reviewsRouter = express.Router();

reviewsRouter.post("/create", authMiddleware, createReview);
reviewsRouter.get("/getbookreviews/:id", getBookReviews);
reviewsRouter.delete("/deletereview/:id", authMiddleware, deleteReview);

export default reviewsRouter;