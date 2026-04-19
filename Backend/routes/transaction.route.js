import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getTransactions } from '../controllers/transaction.controller.js';

const router = Router();

// Transaction Route
router.get('/', verifyJWT, getTransactions);

export default router;
