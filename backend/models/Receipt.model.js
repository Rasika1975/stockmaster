import mongoose from 'mongoose';

const receiptItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  received: {
    type: Number,
    default: 0
  }
});

const receiptSchema = new mongoose.Schema({
  receiptNo: {
    type: String,
    required: true,
    unique: true
  },
  supplier: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Received', 'Done'],
    default: 'Draft'
  },
  warehouse: {
    type: String,
    required: true
  },
  items: [receiptItemSchema]
}, {
  timestamps: true
});

const Receipt = mongoose.model('Receipt', receiptSchema);

export default Receipt;