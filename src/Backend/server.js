// server.js (ES module)
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './db.js';
import userRoutes from './userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
