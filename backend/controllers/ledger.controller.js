import Ledger from '../models/Ledger.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all ledger entries
// @route   GET /api/ledger
// @access  Public
const getLedgerEntries = asyncHandler(async (req, res) => {
  const ledgerEntries = await Ledger.find({});
  res.json(ledgerEntries);
});

// @desc    Fetch single ledger entry
// @route   GET /api/ledger/:id
// @access  Public
const getLedgerEntryById = asyncHandler(async (req, res) => {
  const ledgerEntry = await Ledger.findById(req.params.id);

  if (ledgerEntry) {
    res.json(ledgerEntry);
  } else {
    res.status(404);
    throw new Error('Ledger entry not found');
  }
});

// @desc    Create a ledger entry
// @route   POST /api/ledger
// @access  Private
const createLedgerEntry = asyncHandler(async (req, res) => {
  const { date, time, product, quantity, type, from, to, reference, performedBy } = req.body;

  const ledgerEntry = new Ledger({
    date,
    time,
    product,
    quantity,
    type,
    from,
    to,
    reference,
    performedBy,
  });

  const createdLedgerEntry = await ledgerEntry.save();
  res.status(201).json(createdLedgerEntry);
});

// @desc    Update a ledger entry
// @route   PUT /api/ledger/:id
// @access  Private
const updateLedgerEntry = asyncHandler(async (req, res) => {
  const { date, time, product, quantity, type, from, to, reference, performedBy } = req.body;

  const ledgerEntry = await Ledger.findById(req.params.id);

  if (ledgerEntry) {
    ledgerEntry.date = date || ledgerEntry.date;
    ledgerEntry.time = time || ledgerEntry.time;
    ledgerEntry.product = product || ledgerEntry.product;
    ledgerEntry.quantity = quantity || ledgerEntry.quantity;
    ledgerEntry.type = type || ledgerEntry.type;
    ledgerEntry.from = from || ledgerEntry.from;
    ledgerEntry.to = to || ledgerEntry.to;
    ledgerEntry.reference = reference || ledgerEntry.reference;
    ledgerEntry.performedBy = performedBy || ledgerEntry.performedBy;

    const updatedLedgerEntry = await ledgerEntry.save();
    res.json(updatedLedgerEntry);
  } else {
    res.status(404);
    throw new Error('Ledger entry not found');
  }
});

// @desc    Delete a ledger entry
// @route   DELETE /api/ledger/:id
// @access  Private
const deleteLedgerEntry = asyncHandler(async (req, res) => {
  const ledgerEntry = await Ledger.findById(req.params.id);

  if (ledgerEntry) {
    await ledgerEntry.remove();
    res.json({ message: 'Ledger entry removed' });
  } else {
    res.status(404);
    throw new Error('Ledger entry not found');
  }
});

export {
  getLedgerEntries,
  getLedgerEntryById,
  createLedgerEntry,
  updateLedgerEntry,
  deleteLedgerEntry,
};