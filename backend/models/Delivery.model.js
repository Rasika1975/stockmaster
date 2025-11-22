import mongoose from 'mongoose';

const deliveryItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const deliverySchema = new mongoose.Schema({
  deliveryNo: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Shipped', 'Done'],
    default: 'Draft'
  },
  warehouse: {
    type: String,
    required: true
  },
  items: [deliveryItemSchema]
}, {
  timestamps: true
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;