import express from "express";
import { createReview, deleteReview, getBookReviews } from "../controllers/review.controllers";


const reviewsRouter = express.Router();

reviewsRouter.post("/create", createReview);
reviewsRouter.get("/getbookreviews/:id", getBookReviews);
reviewsRouter.delete("/deletereview/:id", deleteReview);

export default reviewsRouter;