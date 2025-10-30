import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getOrders,
    cancelOrder,
    getMyOrders
} from "../controllers/orderController.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders); // ✅ move this up!
router.route("/admin").get(protect, admin, getOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/cancel").put(protect, admin, cancelOrder);
router.route("/:id").get(protect, getOrderById);

export default router;
