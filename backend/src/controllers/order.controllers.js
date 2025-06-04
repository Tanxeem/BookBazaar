import Order from "../models/order.models.js";
import Book from "../models/book.models.js";

// Place an order
export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;
        
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No order items"
            });
        }
        
        // Calculate prices and update book stock
        let itemsPrice = 0;
        const items = [];
        
        for (const item of orderItems) {
            const book = await Book.findById(item.book);
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: `Book not found: ${item.book}`
                });
            }
            
            if (book.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for: ${book.title}`
                });
            }
            
            itemsPrice += book.price * item.quantity;
            
            items.push({
                book: book._id,
                quantity: item.quantity,
                price: book.price
            });
            
            // Update book stock
            book.stock -= item.quantity;
            await book.save();
        }
        
        // Calculate tax and shipping (simplified)
        const taxPrice = itemsPrice * 0.1; // 10% tax
        const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
        const totalPrice = itemsPrice + taxPrice + shippingPrice;
        
        // Create order
        const order = await Order.create({
            user: req.user._id,
            orderItems: items,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        
        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('orderItems.book', 'title author price');
            
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get order details
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.book', 'title author price');
            
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        
        // Check if user is the owner or admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: "Not authorized to view this order"
            });
        }
        
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};