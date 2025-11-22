import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import warehouseRoutes from './routes/warehouse.routes.js';
import categoryRoutes from './routes/category.routes.js';
import receiptRoutes from './routes/receipt.routes.js';
import deliveryRoutes from './routes/delivery.routes.js';
import transferRoutes from './routes/transfer.routes.js';
import adjustmentRoutes from './routes/adjustment.routes.js';
import ledgerRoutes from './routes/ledger.routes.js';

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://athawalemayur115_db_user:pXfSchgdcq0tmW4e@cluster0.z4dnkhc.mongodb.net/stockmaster')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/ledger', ledgerRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'StockMaster API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});