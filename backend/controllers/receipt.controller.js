import Receipt from '../models/Receipt.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all receipts
// @route   GET /api/receipts
// @access  Public
const getReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find({});
  res.json(receipts);
});

// @desc    Fetch single receipt
// @route   GET /api/receipts/:id
// @access  Public
const getReceiptById = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (receipt) {
    res.json(receipt);
  } else {
    res.status(404);
    throw new Error('Receipt not found');
  }
});

// @desc    Create a receipt
// @route   POST /api/receipts
// @access  Private
const createReceipt = asyncHandler(async (req, res) => {
  const { receiptNo, supplier, date, status, warehouse, items } = req.body;

  const receipt = new Receipt({
    receiptNo,
    supplier,
    date,
    status,
    warehouse,
    items,
  });

  const createdReceipt = await receipt.save();
  res.status(201).json(createdReceipt);
});

// @desc    Update a receipt
// @route   PUT /api/receipts/:id
// @access  Private
const updateReceipt = asyncHandler(async (req, res) => {
  const { receiptNo, supplier, date, status, warehouse, items } = req.body;

  const receipt = await Receipt.findById(req.params.id);

  if (receipt) {
    receipt.receiptNo = receiptNo || receipt.receiptNo;
    receipt.supplier = supplier || receipt.supplier;
    receipt.date = date || receipt.date;
    receipt.status = status || receipt.status;
    receipt.warehouse = warehouse || receipt.warehouse;
    receipt.items = items || receipt.items;

    const updatedReceipt = await receipt.save();
    res.json(updatedReceipt);
  } else {
    res.status(404);
    throw new Error('Receipt not found');
  }
});

// @desc    Delete a receipt
// @route   DELETE /api/receipts/:id
// @access  Private
const deleteReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (receipt) {
    await receipt.remove();
    res.json({ message: 'Receipt removed' });
  } else {
    res.status(404);
    throw new Error('Receipt not found');
  }
});

export {
  getReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};