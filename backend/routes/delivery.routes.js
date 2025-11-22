import express from 'express';
const router = express.Router();
import {
  getDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from '../controllers/delivery.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/').get(getDeliveries).post(protect, createDelivery);
router
  .route('/:id')
  .get(getDeliveryById)
  .put(protect, updateDelivery)
  .delete(protect, deleteDelivery);

export default router;