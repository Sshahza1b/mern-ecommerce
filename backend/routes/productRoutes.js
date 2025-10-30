import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// ✅ Fetch all products
router.route('/').get(getProducts);

// ✅ Fetch a single product by ID
router.route('/:id').get(getProductById);

// ✅ Create a new product (POST)
router.route('/').get(getProducts).post(protect, admin, createProduct);

// ✅ Update a product (PUT)
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;
