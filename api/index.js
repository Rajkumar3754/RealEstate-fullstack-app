import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Import routes
import userRouter from '../api/routes/user.route.js';
import authRouter from '../api/routes/auth.route.js';
import listingRouter from '../api/routes/listing.route.js';

// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// CORS Configuration
app.use(cors({
    origin: 'https://realestate-fullstack-app.onrender.com', // Adjust this to your frontend URL
    credentials: true, // Allows cookies to be sent
}));

// Static Files Serving
const __dirname = path.resolve(); // Ensure __dirname is properly set
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Catch-all route for serving the frontend app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // Increase socket timeout
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err.message));

// Start Server
const port = process.env.PORT || 8000; // Use environment variable for port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
