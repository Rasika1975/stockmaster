import mongoose from 'mongoose';

const adjustmentSchema = new mongoose.Schema({
  adjustmentNo: {
    type: String,
    required: true,
    unique: true
  },
  product: {
    type: String,
    required: true
  },
  warehouse: {
    type: String,
    required: true
  },
  systemQty: {
    type: Number,
    required: true
  },
  countedQty: {
    type: Number,
    required: true
  },
  difference: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  performedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Adjustment = mongoose.model('Adjustment', adjustmentSchema);

export default Adjustment;