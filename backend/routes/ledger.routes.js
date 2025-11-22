import express from 'express';
const router = express.Router();
import {
  getLedgerEntries,
  getLedgerEntryById,
  createLedgerEntry,
  updateLedgerEntry,
  deleteLedgerEntry,
} from '../controllers/ledger.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/').get(getLedgerEntries).post(protect, createLedgerEntry);
router
  .route('/:id')
  .get(getLedgerEntryById)
  .put(protect, updateLedgerEntry)
  .delete(protect, deleteLedgerEntry);

export default router;