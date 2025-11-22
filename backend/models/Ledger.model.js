import mongoose from 'mongoose';

const ledgerSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Receipt', 'Delivery', 'Transfer', 'Adjustment'],
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  performedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Ledger = mongoose.model('Ledger', ledgerSchema);

export default Ledger;