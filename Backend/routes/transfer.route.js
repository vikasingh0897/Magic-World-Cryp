import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { initiateTransfer } from '../controllers/transfer.controller.js';

const router = Router();

// Balance Transfer Route
router.post('/', verifyJWT, initiateTransfer);

export default router;
