import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  reorderLevel: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  locations: {
    type: Map,
    of: Number,
    default: {}
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;