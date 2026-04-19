import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Express app initilization
const app = express();

// Cors configuration
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, 'https://magicworldcrypto.app'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Basic Configuration
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,

    message: 'API is running!',

    timestamp: new Date().toISOString(),
  });
});

// Auth Routes
import authRouter from '../routes/auth.route.js';
app.use('/api/v1/auth', authRouter);

// User Routes
import userRouter from '../routes/user.route.js';
app.use('/api/v1/users', userRouter);

// Admin Routes
import adminRouter from '../routes/admin.route.js';
app.use('/api/v1/admin', adminRouter);

// Transfer Routes
import transferRouter from '../routes/transfer.route.js';
app.use('/api/v1/transfers', transferRouter);

// Transaction Routes
import transactionRouter from '../routes/transaction.route.js';
app.use('/api/v1/transactions', transactionRouter);

export default app;
