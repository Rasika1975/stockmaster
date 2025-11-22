import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentStock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

export default Warehouse;