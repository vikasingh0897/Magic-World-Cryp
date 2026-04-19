import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  getMyProfile,
  getMyTransactions,
} from '../controllers/user.controller.js';

const router = Router();

// JWT verification
router.use(verifyJWT);

// Get Profile
router.get('/me', getMyProfile);

// Get Transactions
router.get('/transactions', getMyTransactions);

export default router;
