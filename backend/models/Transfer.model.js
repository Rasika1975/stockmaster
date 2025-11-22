import mongoose from 'mongoose';

const transferItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const transferSchema = new mongoose.Schema({
  transferNo: {
    type: String,
    required: true,
    unique: true
  },
  fromWarehouse: {
    type: String,
    required: true
  },
  toWarehouse: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Completed'],
    default: 'Draft'
  },
  items: [transferItemSchema],
  reason: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Transfer = mongoose.model('Transfer', transferSchema);

export default Transfer;