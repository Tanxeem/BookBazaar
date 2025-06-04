import crypto from "crypto";
import Order from "../models/order.models.js";

// Create mock Razorpay payment ID
export const createPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        
        // Verify order exists and belongs to user
        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id
        });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        
        // Verify amount matches order total
        if (amount !== order.totalPrice) {
            return res.status(400).json({
                success: false,
                message: "Amount does not match order total"
            });
        }
        
        // Generate mock payment ID
        const paymentId = `pay_${crypto.randomBytes(16).toString('hex')}`;
        
        res.status(200).json({
            success: true,
            paymentId,
            amount,
            currency: "USD",
            orderId: order._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Verify mock payment
export const verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;
        
        // Verify order exists and belongs to user
        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id
        });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        
        // Update order payment status
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: paymentId,
            status: 'completed',
            update_time: new Date().toISOString(),
            email_address: req.user.email
        };
        
        await order.save();
        
        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};