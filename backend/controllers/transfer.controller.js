import Transfer from '../models/Transfer.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all transfers
// @route   GET /api/transfers
// @access  Public
const getTransfers = asyncHandler(async (req, res) => {
  const transfers = await Transfer.find({});
  res.json(transfers);
});

// @desc    Fetch single transfer
// @route   GET /api/transfers/:id
// @access  Public
const getTransferById = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id);

  if (transfer) {
    res.json(transfer);
  } else {
    res.status(404);
    throw new Error('Transfer not found');
  }
});

// @desc    Create a transfer
// @route   POST /api/transfers
// @access  Private
const createTransfer = asyncHandler(async (req, res) => {
  const { transferNo, fromWarehouse, toWarehouse, date, status, items, reason } = req.body;

  const transfer = new Transfer({
    transferNo,
    fromWarehouse,
    toWarehouse,
    date,
    status,
    items,
    reason,
  });

  const createdTransfer = await transfer.save();
  res.status(201).json(createdTransfer);
});

// @desc    Update a transfer
// @route   PUT /api/transfers/:id
// @access  Private
const updateTransfer = asyncHandler(async (req, res) => {
  const { transferNo, fromWarehouse, toWarehouse, date, status, items, reason } = req.body;

  const transfer = await Transfer.findById(req.params.id);

  if (transfer) {
    transfer.transferNo = transferNo || transfer.transferNo;
    transfer.fromWarehouse = fromWarehouse || transfer.fromWarehouse;
    transfer.toWarehouse = toWarehouse || transfer.toWarehouse;
    transfer.date = date || transfer.date;
    transfer.status = status || transfer.status;
    transfer.items = items || transfer.items;
    transfer.reason = reason || transfer.reason;

    const updatedTransfer = await transfer.save();
    res.json(updatedTransfer);
  } else {
    res.status(404);
    throw new Error('Transfer not found');
  }
});

// @desc    Delete a transfer
// @route   DELETE /api/transfers/:id
// @access  Private
const deleteTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id);

  if (transfer) {
    await transfer.remove();
    res.json({ message: 'Transfer removed' });
  } else {
    res.status(404);
    throw new Error('Transfer not found');
  }
});

export {
  getTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer,
};