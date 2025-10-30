import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

import mongoose from 'mongoose';

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400); // Bad Request
        throw new Error('Invalid product ID');
    }

    const product = await Product.findById(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        rating
    } = req.body;

    // ✅ Fix: Make sure image path always includes '/uploads/'
    let imagePath = image;
    if (image && !image.startsWith('/uploads/')) {
        imagePath = `/uploads/${image}`;
    }

    const product = new Product({
        name,
        price,
        user: req.user._id,
        image: imagePath, // use fixed path
        brand,
        category,
        countInStock,
        description,
        rating: rating || 0,
        numReviews: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});




const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid product ID');
    }

    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Update fields only if provided
    const { name, price, description, image, brand, category, countInStock, rating } = req.body;

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description !== undefined ? description : product.description;
    if (image !== undefined) {
        product.image = image.startsWith('/uploads/')
            ? image
            : `/uploads/${image}`;
    }
    product.brand = brand !== undefined ? brand : product.brand;
    product.category = category !== undefined ? category : product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.rating = rating !== undefined ? rating : product.rating;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
});



// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {


    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


export { getProducts, getProductById, updateProduct, createProduct, deleteProduct };
