import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// 🌱 Load environment variables
dotenv.config();

// 🔗 Connect MongoDB
connectDB();

const app = express();
app.use(express.json());

// 🧭 API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// 🗂️ Serve uploads folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ⚙️ Serve frontend (React build)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    // 🟢 FIX for Express v5 (no /* or * directly)
    app.use((req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });

} else {
    app.get('/', (req, res) => {
        res.send('API is Running...');
    });
}

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    () =>
        console.log(
            `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
        )
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('/*path', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


