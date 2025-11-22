import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(protect, getUserProfile);

export default router;