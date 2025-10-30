import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc Create New Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    console.log("ADD ORDER REQ BODY:", JSON.stringify(req.body, null, 2));

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: itemsPriceFromReq,
        taxPrice: taxPriceFromReq,
        shippingPrice: shippingPriceFromReq,
        totalPrice: totalPriceFromReq,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    // ✅ Map items
    const mappedItems = orderItems.map((item) => ({
        name: item.name,
        qty: Number(item.qty),
        image: item.image,
        price: Number(item.price),
        product: item.product,
    }));

    // ✅ Auto-calculate prices if frontend didn't send
    const itemsPrice = Number(itemsPriceFromReq) || mappedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = Number(taxPriceFromReq) || Number((0.05 * itemsPrice).toFixed(2)); // 5% tax example
    const shippingPrice = Number(shippingPriceFromReq) || (itemsPrice > 500 ? 0 : 10); // free shipping > 500
    const totalPrice = Number(totalPriceFromReq) || Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

    console.log("ITEMS PRICE:", itemsPrice);
    console.log("TAX PRICE:", taxPrice);
    console.log("SHIPPING PRICE:", shippingPrice);
    console.log("TOTAL PRICE:", totalPrice);

    const order = new Order({
        user: req.user._id,
        orderItems: mappedItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    // ✅ Save order
    const createdOrder = await order.save();
    console.log("✅ ORDER SAVED:", createdOrder._id);

    // ✅ Update stock
    for (const item of mappedItems) {
        const product = await Product.findById(item.product);
        if (product) {
            product.countInStock = Math.max(0, product.countInStock - item.qty);
            await product.save();
        }
    }

    // ✅ Return order to frontend
    res.status(201).json(createdOrder);
});


// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
        const orderObj = order.toObject();
        if (!req.user.isAdmin) {
            delete orderObj.isDelivered;
            delete orderObj.deliveredAt;
        }
        res.json(orderObj);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer?.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc Get all orders (Admin)
// @route GET /api/orders/admin
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    // 👇 LIFO sorting (latest order at top)
    const orders = await Order.find({})
        .populate("user", "id name email")
        .sort({ createdAt: -1 });

    res.json(orders);
});

// @desc Cancel an order (Admin) and restore stock
// @route PUT /api/orders/:id/cancel
// @access Private/Admin
const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    if (order.isCancelled) {
        res.status(400);
        throw new Error("Order already cancelled");
    }

    order.isCancelled = true;
    order.cancelledAt = Date.now();
    order.status = "Cancelled";

    // Restore stock
    for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
            product.countInStock += item.qty;
            await product.save();
        }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getOrders, cancelOrder, getMyOrders };
