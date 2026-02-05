const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const initScheduler = require('./utils/scheduler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175'
    ];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // In dev, we might want to just log it instead of failing hard, or add to list
      // For now, let's be strict but strictly list expected ports
      // return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
      // Actually, for user convenience in this specific environment, let's allow all localhost
      // Allow standard local dev URLs
      if(
        origin.startsWith('http://localhost:') || 
        origin.startsWith('http://127.0.0.1:') || 
        origin.startsWith('http://192.168.') ||
        origin.startsWith('http://10.') || 
        origin.startsWith('http://172.')
      ) {
        return callback(null, true);
      }
      
      return callback(new Error('CORS Error'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error handler
app.use(require('./middleware/errorHandler'));

// Initialize auto-deletion scheduler
initScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
