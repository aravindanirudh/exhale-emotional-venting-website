const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 2000, // Increased for dev
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100, // Increased for dev
  message: {
    success: false,
    message: 'Too many login attempts, please try again later'
  }
});

const postLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100, // Increased for dev
  message: {
    success: false,
    message: 'Daily post limit reached. Try again tomorrow.'
  }
});

module.exports = { apiLimiter, authLimiter, postLimiter };
