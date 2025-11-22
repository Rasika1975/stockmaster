import Adjustment from '../models/Adjustment.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all adjustments
// @route   GET /api/adjustments
// @access  Public
const getAdjustments = asyncHandler(async (req, res) => {
  const adjustments = await Adjustment.find({});
  res.json(adjustments);
});

// @desc    Fetch single adjustment
// @route   GET /api/adjustments/:id
// @access  Public
const getAdjustmentById = asyncHandler(async (req, res) => {
  const adjustment = await Adjustment.findById(req.params.id);

  if (adjustment) {
    res.json(adjustment);
  } else {
    res.status(404);
    throw new Error('Adjustment not found');
  }
});

// @desc    Create an adjustment
// @route   POST /api/adjustments
// @access  Private
const createAdjustment = asyncHandler(async (req, res) => {
  const { adjustmentNo, product, warehouse, systemQty, countedQty, difference, reason, date, performedBy } = req.body;

  const adjustment = new Adjustment({
    adjustmentNo,
    product,
    warehouse,
    systemQty,
    countedQty,
    difference,
    reason,
    date,
    performedBy,
  });

  const createdAdjustment = await adjustment.save();
  res.status(201).json(createdAdjustment);
});

// @desc    Update an adjustment
// @route   PUT /api/adjustments/:id
// @access  Private
const updateAdjustment = asyncHandler(async (req, res) => {
  const { adjustmentNo, product, warehouse, systemQty, countedQty, difference, reason, date, performedBy } = req.body;

  const adjustment = await Adjustment.findById(req.params.id);

  if (adjustment) {
    adjustment.adjustmentNo = adjustmentNo || adjustment.adjustmentNo;
    adjustment.product = product || adjustment.product;
    adjustment.warehouse = warehouse || adjustment.warehouse;
    adjustment.systemQty = systemQty || adjustment.systemQty;
    adjustment.countedQty = countedQty || adjustment.countedQty;
    adjustment.difference = difference || adjustment.difference;
    adjustment.reason = reason || adjustment.reason;
    adjustment.date = date || adjustment.date;
    adjustment.performedBy = performedBy || adjustment.performedBy;

    const updatedAdjustment = await adjustment.save();
    res.json(updatedAdjustment);
  } else {
    res.status(404);
    throw new Error('Adjustment not found');
  }
});

// @desc    Delete an adjustment
// @route   DELETE /api/adjustments/:id
// @access  Private
const deleteAdjustment = asyncHandler(async (req, res) => {
  const adjustment = await Adjustment.findById(req.params.id);

  if (adjustment) {
    await adjustment.remove();
    res.json({ message: 'Adjustment removed' });
  } else {
    res.status(404);
    throw new Error('Adjustment not found');
  }
});

export {
  getAdjustments,
  getAdjustmentById,
  createAdjustment,
  updateAdjustment,
  deleteAdjustment,
};