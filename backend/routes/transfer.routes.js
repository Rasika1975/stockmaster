import express from 'express';
const router = express.Router();
import {
  getTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer,
} from '../controllers/transfer.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/').get(getTransfers).post(protect, createTransfer);
router
  .route('/:id')
  .get(getTransferById)
  .put(protect, updateTransfer)
  .delete(protect, deleteTransfer);

export default router;