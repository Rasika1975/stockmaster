import express from 'express';
const router = express.Router();
import {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from '../controllers/warehouse.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

router.route('/').get(getWarehouses).post(protect, admin, createWarehouse);
router
  .route('/:id')
  .get(getWarehouseById)
  .put(protect, admin, updateWarehouse)
  .delete(protect, admin, deleteWarehouse);

export default router;