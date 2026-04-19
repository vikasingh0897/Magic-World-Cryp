import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeAdmin } from '../middlewares/admin.middleware.js';
import {
  updateUserBalance,
  getAuditLogs,
  getAllUsers,
  getAdminStats,
} from '../controllers/admin.controller.js';

const router = Router();

// To verify JWT and Verify admin role
router.use(verifyJWT, authorizeAdmin);

// Admin Stats
router.get('/stats', getAdminStats);

// Users list
router.get('/users', getAllUsers);

// Update User Balance
router.patch('/users/:userId/balance', updateUserBalance);

// Transaction History
router.get('/transactions', getAuditLogs);

export default router;
