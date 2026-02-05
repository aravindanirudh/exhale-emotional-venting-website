const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('anonymousName')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Anonymous name must be 3-30 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').trim().notEmpty()
];

const postValidation = [
  body('content')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Post content must be 10-5000 characters'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('mood')
    .isIn(['happy', 'sad', 'angry', 'anxious', 'confused', 'neutral', 'hopeful', 'grateful'])
    .withMessage('Invalid mood selection')
];

const commentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Comment must be 1-2000 characters'),
  
  body('postId')
    .isMongoId()
    .withMessage('Invalid post ID')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  postValidation,
  commentValidation,
  validate
};
