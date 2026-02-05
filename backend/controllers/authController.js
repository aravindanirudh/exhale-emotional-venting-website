const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { anonymousName, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { anonymousName }] 
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or anonymous name already exists'
      });
    }

    // Create user
    console.log('Attempting to create user with:', { anonymousName, email });
    
    const user = await User.create({
      anonymousName,
      email,
      password,
      tokens: 10 // Start with 10 tokens
    });

    console.log('User created successfully in DB:', user._id);

    if (user) {
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          user: {
            id: user._id,
            anonymousName: user.anonymousName,
            tokens: user.tokens,
            role: user.role
          },
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      // Check if active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account has been deactivated'
        });
      }

      // Daily login bonus could be checked here or separate endpoint
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            anonymousName: user.anonymousName,
            tokens: user.tokens,
            role: user.role
          },
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      if (req.body.anonymousName) {
        // Check uniqueness if changing
        if (req.body.anonymousName !== user.anonymousName) {
            const exists = await User.findOne({ anonymousName: req.body.anonymousName });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Anonymous name already taken'
                });
            }
        }
        user.anonymousName = req.body.anonymousName;
      }
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        message: 'Profile updated',
        data: {
          id: updatedUser._id,
          anonymousName: updatedUser.anonymousName,
          tokens: updatedUser.tokens,
          role: updatedUser.role
        },
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile
};
