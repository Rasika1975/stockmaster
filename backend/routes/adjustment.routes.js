import express from 'express';
const router = express.Router();
import {
  getAdjustments,
  getAdjustmentById,
  createAdjustment,
  updateAdjustment,
  deleteAdjustment,
} from '../controllers/adjustment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/').get(getAdjustments).post(protect, createAdjustment);
router
  .route('/:id')
  .get(getAdjustmentById)
  .put(protect, updateAdjustment)
  .delete(protect, deleteAdjustment);

export default router;