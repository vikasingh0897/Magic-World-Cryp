import dotenv from 'dotenv/config';
import connectDB from '../db/connection.js';
import app from './app.js';

// Port
const port = process.env.PORT || 5000;

// DB connection and request listening
connectDB()
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('MONGODB connection failed: ', error);
  });

// Handle Local Development && Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, (req, res) => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

export default app;
