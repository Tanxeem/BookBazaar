import express from "express";
import { createOrder, getOrderById, getUserOrders } from "../controllers/order.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";


const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware, createOrder)
orderRouter.get("/getuserorders", authMiddleware, getUserOrders)
orderRouter.get("/getorderbyid/:id", authMiddleware, getOrderById)

export default orderRouter;