import express from 'express';
const router = express.Router();
import {
  getReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
} from '../controllers/receipt.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/').get(getReceipts).post(protect, createReceipt);
router
  .route('/:id')
  .get(getReceiptById)
  .put(protect, updateReceipt)
  .delete(protect, deleteReceipt);

export default router;