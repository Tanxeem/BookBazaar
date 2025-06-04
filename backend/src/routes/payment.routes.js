import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createPayment, verifyPayment } from "../controllers/payment.controllers.js";


const paymentRouter = express.Router();

paymentRouter.post("/create", authMiddleware, createPayment);
paymentRouter.post("/verify", authMiddleware, verifyPayment);

export default paymentRouter;