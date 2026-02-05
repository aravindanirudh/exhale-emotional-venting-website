# Product Requirements Document (PRD)
# Exhale - Anonymous Emotional Venting Platform

**Version:** 1.0  
**Date:** February 2026  
**Project Team:** Group 11 (Anandhakrishnan S, Aravind A Kamath, Arjun Manoj, Zana Noushad)  
**Institution:** College of Engineering, Cherthala  

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Database Schema](#5-database-schema)
6. [API Endpoints](#6-api-endpoints)
7. [Frontend Pages & Components](#7-frontend-pages--components)
8. [Authentication System](#8-authentication-system)
9. [Core Features Specification](#9-core-features-specification)
10. [Security Requirements](#10-security-requirements)
11. [Environment Configuration](#11-environment-configuration)
12. [Step-by-Step Setup Guide](#12-step-by-step-setup-guide)
13. [Razorpay Integration Preparation](#13-razorpay-integration-preparation)
14. [UI/UX Specifications](#14-uiux-specifications)
15. [Testing Requirements](#15-testing-requirements)

---

## 1. Executive Summary

**Exhale** is a Software-as-a-Service (SaaS) anonymous emotional venting and advice-sharing platform. Users can anonymously create posts on a public "venting wall," receive emoji reactions and comments from others, and earn virtual tokens as rewards. The platform prioritizes user anonymity while maintaining content moderation capabilities.

### Problem Statement
- Modern life causes significant mental stress and related health problems
- People need a safe space to express emotions without fear of judgment
- Existing platforms (like Reddit) have security concerns and negative community culture
- Most alternatives offer only one-on-one or group communication, lacking a public venting wall

### Solution
A secure, anonymous platform where users can:
- Post their feelings/frustrations anonymously
- Receive supportive responses from the community
- Earn tokens for engagement
- Optionally auto-delete posts for additional privacy

---

## 2. Project Overview

### 2.1 Core Objectives
1. Provide anonymous emotional venting functionality
2. Maintain complete user anonymity while ensuring legal compliance
3. Enable community support through reactions and comments
4. Reward user engagement with virtual tokens
5. Allow content moderation by administrators

### 2.2 Key Features Summary
| Feature | Description |
|---------|-------------|
| Anonymous Posting | Users create posts visible on a common wall without revealing identity |
| Mood Tags | Posts categorized by emotional state (happy, sad, angry, anxious, confused, neutral) |
| Emoji Reactions | Users can react to posts with predefined emojis |
| Comments & Replies | Threaded comment system with reply functionality |
| Auto-Deletion Timer | Optional automatic post deletion after specified time |
| Token Rewards | Virtual currency earned for creating posts and comments |
| Admin Moderation | Admins can delete inappropriate posts and comments |

### 2.3 User Roles
1. **Guest** - Can view public posts only
2. **Authenticated User** - Full access to posting, commenting, reacting
3. **Administrator** - All user privileges + moderation capabilities (such as the ability to delete posts and comments)

---

## 3. Technology Stack

### 3.1 Frontend
```
Framework: React 18+ with Vite
Styling: TailwindCSS (NO separate CSS files)
Routing: React Router DOM v6
HTTP Client: Axios
Icons: React Icons (lucide-react or react-icons)
Notifications: Sonner (toast notifications)
State Management: React Context API + useState/useReducer
```

### 3.2 Backend
```
Runtime: Node.js v16.0.0+
Framework: Express.js
Authentication: JWT (jsonwebtoken) + bcryptjs
Database ODM: Mongoose
Development: Nodemon
```

### 3.3 Database
```
Database: MongoDB v5.0+
ODM: Mongoose
```

### 3.4 Required NPM Packages

#### Frontend (package.json)
```json
{
  "name": "exhale-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.7",
    "lucide-react": "^0.344.0",
    "sonner": "^1.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0"
  }
}
```

#### Backend (package.json)
```json
{
  "name": "exhale-backend",
  "version": "1.0.0",
  "description": "Backend API for Exhale anonymous venting platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "node-cron": "^3.0.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.3"
  }
}
```

---

## 4. Project Structure

### 4.1 Complete Folder Structure

```
exhale/
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── AdminRoute.jsx
│   │   │   ├── posts/
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostList.jsx
│   │   │   │   ├── CreatePostForm.jsx
│   │   │   │   ├── MoodSelector.jsx
│   │   │   │   ├── AutoDeleteTimer.jsx
│   │   │   │   └── EmojiReactions.jsx
│   │   │   ├── comments/
│   │   │   │   ├── CommentSection.jsx
│   │   │   │   ├── CommentCard.jsx
│   │   │   │   ├── CommentForm.jsx
│   │   │   │   └── ReplyForm.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── RegisterForm.jsx
│   │   │   └── admin/
│   │   │       ├── AdminPostList.jsx
│   │   │       └── AdminCommentList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── usePosts.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── VentingWallPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── PostDetailPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── postService.js
│   │   │   └── commentService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── commentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── validators.js
│   │   └── scheduler.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## 5. Database Schema

### 5.1 User Model (models/User.js)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Anonymous username (auto-generated or user-chosen)
  anonymousName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  
  // Email for authentication only (never displayed publicly)
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Hashed password
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // User role
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  // Virtual currency tokens
  tokens: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### 5.2 Post Model (models/Post.js)

```javascript
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  emoji: {
    type: String,
    required: true,
    enum: ['❤️', '🤗', '😢', '😡', '💪', '🙏']
  }
}, { _id: false });

const postSchema = new mongoose.Schema({
  // Post author (reference, but never exposed publicly)
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Post content
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 5000
  },
  
  // Optional title
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  
  // Mood tag
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'confused', 'neutral', 'hopeful', 'grateful']
  },
  
  // Emoji reactions
  reactions: [reactionSchema],
  
  // Reaction counts (for quick access)
  reactionCounts: {
    '❤️': { type: Number, default: 0 },
    '🤗': { type: Number, default: 0 },
    '😢': { type: Number, default: 0 },
    '😡': { type: Number, default: 0 },
    '💪': { type: Number, default: 0 },
    '🙏': { type: Number, default: 0 }
  },
  
  // Comment count
  commentCount: {
    type: Number,
    default: 0
  },
  
  // Auto-deletion settings
  autoDelete: {
    enabled: {
      type: Boolean,
      default: false
    },
    deleteAt: {
      type: Date,
      default: null
    }
  },
  
  // Post visibility
  isVisible: {
    type: Boolean,
    default: true
  },
  
  // Deleted by admin flag
  deletedByAdmin: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for auto-deletion queries
postSchema.index({ 'autoDelete.deleteAt': 1 });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);
```

### 5.3 Comment Model (models/Comment.js)

```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  // Post this comment belongs to
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  
  // Comment author
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Comment content
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 2000
  },
  
  // Parent comment (for replies/threading)
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  
  // Nesting depth (max 2 levels: comment -> reply)
  depth: {
    type: Number,
    default: 0,
    max: 1
  },
  
  // Comment visibility
  isVisible: {
    type: Boolean,
    default: true
  },
  
  // Deleted by admin flag
  deletedByAdmin: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ parentComment: 1 });

module.exports = mongoose.model('Comment', commentSchema);
```

---

## 6. API Endpoints

### 6.1 Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| PUT | `/api/auth/update-profile` | Update user profile | Yes |
| POST | `/api/auth/logout` | Logout user (client-side token removal) | Yes |

#### Request/Response Examples

**POST /api/auth/register**
```json
// Request Body
{
  "anonymousName": "SilentWanderer",
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// Success Response (201)
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "anonymousName": "SilentWanderer",
      "tokens": 10,
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**POST /api/auth/login**
```json
// Request Body
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// Success Response (200)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "anonymousName": "SilentWanderer",
      "tokens": 150,
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 6.2 Post Routes (`/api/posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts (paginated) | No |
| GET | `/api/posts/:id` | Get single post by ID | No |
| POST | `/api/posts` | Create new post | Yes |
| DELETE | `/api/posts/:id` | Delete own post | Yes |
| POST | `/api/posts/:id/react` | Add/toggle reaction | Yes |
| GET | `/api/posts/my-posts` | Get current user's posts | Yes |
| GET | `/api/posts/mood/:mood` | Filter posts by mood | No |

#### Request/Response Examples

**POST /api/posts**
```json
// Request Body
{
  "title": "Feeling overwhelmed today",
  "content": "I just need to get this off my chest. Work has been incredibly stressful and I feel like I'm drowning in responsibilities...",
  "mood": "anxious",
  "autoDelete": {
    "enabled": true,
    "hours": 24
  }
}

// Success Response (201)
{
  "success": true,
  "message": "Post created successfully. You earned 5 tokens!",
  "data": {
    "post": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "title": "Feeling overwhelmed today",
      "content": "I just need to get this off my chest...",
      "mood": "anxious",
      "reactions": [],
      "reactionCounts": {},
      "commentCount": 0,
      "autoDelete": {
        "enabled": true,
        "deleteAt": "2024-02-06T12:00:00.000Z"
      },
      "createdAt": "2024-02-05T12:00:00.000Z"
    },
    "tokensEarned": 5,
    "newTokenBalance": 155
  }
}
```

**POST /api/posts/:id/react**
```json
// Request Body
{
  "emoji": "🤗"
}

// Success Response (200)
{
  "success": true,
  "message": "Reaction added",
  "data": {
    "reactionCounts": {
      "❤️": 5,
      "🤗": 12,
      "😢": 3,
      "😡": 0,
      "💪": 8,
      "🙏": 15
    }
  }
}
```

### 6.3 Comment Routes (`/api/comments`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/comments/post/:postId` | Get comments for a post | No |
| POST | `/api/comments` | Create new comment | Yes |
| POST | `/api/comments/:id/reply` | Reply to a comment | Yes |
| DELETE | `/api/comments/:id` | Delete own comment | Yes |

#### Request/Response Examples

**POST /api/comments**
```json
// Request Body
{
  "postId": "65f1a2b3c4d5e6f7g8h9i0j2",
  "content": "I understand how you feel. Remember that it's okay to take breaks and prioritize your mental health."
}

// Success Response (201)
{
  "success": true,
  "message": "Comment added. You earned 2 tokens!",
  "data": {
    "comment": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j3",
      "content": "I understand how you feel...",
      "authorName": "AnonymousFriend42",
      "depth": 0,
      "createdAt": "2024-02-05T12:30:00.000Z"
    },
    "tokensEarned": 2,
    "newTokenBalance": 157
  }
}
```

### 6.4 Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/posts` | Get all posts (including hidden) | Admin |
| DELETE | `/api/admin/posts/:id` | Delete any post | Admin |
| GET | `/api/admin/comments` | Get all comments | Admin |
| DELETE | `/api/admin/comments/:id` | Delete any comment | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| PUT | `/api/admin/users/:id/toggle-status` | Activate/deactivate user | Admin |
| GET | `/api/admin/stats` | Get platform statistics | Admin |

---

## 7. Frontend Pages & Components

### 7.1 Page Specifications

#### HomePage.jsx
- Hero section with platform description
- Call-to-action buttons (Login/Register or Go to Wall)
- Brief feature highlights
- Testimonial/statistics section (optional)

#### LoginPage.jsx
- Email input field
- Password input field
- "Remember me" checkbox
- Login button
- Link to registration page
- Error message display area

#### RegisterPage.jsx
- Anonymous name input field
- Email input field
- Password input field
- Confirm password input field
- Terms acceptance checkbox
- Register button
- Link to login page

#### VentingWallPage.jsx
- Filter/sort options (by mood, by date)
- Post list with infinite scroll or pagination
- "Create Post" floating action button
- Each post displays:
  - Mood tag badge
  - Post content (truncated)
  - Reaction buttons with counts
  - Comment count
  - Time ago indicator
  - Auto-delete countdown (if enabled)

#### CreatePostPage.jsx
- Title input (optional)
- Content textarea with character count
- Mood selector dropdown/grid
- Auto-delete toggle with time selector (1hr, 6hr, 12hr, 24hr, 48hr, 1 week)
- Submit button
- Preview option

#### PostDetailPage.jsx
- Full post content
- All reactions with ability to add/remove
- Comment section with:
  - Comment form
  - Threaded comments (max 2 levels)
  - Reply functionality
- Delete button (if own post)

#### ProfilePage.jsx
- Anonymous name display
- Token balance display
- Total posts count
- Total comments count
- List of user's own posts
- Account settings (change password)

#### AdminDashboardPage.jsx
- Statistics cards (total users, posts, comments)
- Recent posts list with delete option
- Reported/flagged content section
- User management section

### 7.2 Component Specifications

#### Navbar.jsx
```jsx
// Features:
// - Logo/Brand name
// - Navigation links (Home, Venting Wall)
// - Auth status indicator
// - If logged in: Token balance, Profile dropdown, Logout
// - If not logged in: Login/Register buttons
// - Mobile hamburger menu
```

#### PostCard.jsx
```jsx
// Props:
// - post: Post object
// - onReact: Function to handle reactions
// - showFullContent: Boolean (default false)

// Displays:
// - Mood badge with color coding
// - Title (if exists)
// - Content (truncated unless showFullContent)
// - Reaction bar
// - Comment count
// - Relative time (e.g., "2 hours ago")
// - Auto-delete countdown (if enabled)
```

#### MoodSelector.jsx
```jsx
// Props:
// - selectedMood: String
// - onSelect: Function

// Moods with colors:
// - happy: green
// - sad: blue
// - angry: red
// - anxious: yellow/orange
// - confused: purple
// - neutral: gray
// - hopeful: teal
// - grateful: pink
```

#### EmojiReactions.jsx
```jsx
// Props:
// - reactions: Object with counts
// - userReaction: String (user's current reaction if any)
// - onReact: Function

// Emojis:
// ❤️ - Love/Support
// 🤗 - Hug/Comfort
// 😢 - I feel you/Empathy
// 😡 - That's unfair/Anger
// 💪 - Stay strong/Encouragement
// 🙏 - Sending prayers/Hope
```

---

## 8. Authentication System

### 8.1 JWT Implementation

#### Token Generation (backend/utils/generateToken.js)
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
```

#### Auth Middleware (backend/middleware/authMiddleware.js)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid'
    });
  }
};

module.exports = { protect };
```

### 8.2 Frontend Auth Context (frontend/src/context/AuthContext.jsx)
```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('exhale_token');
    if (token) {
      authService.getMe()
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('exhale_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    localStorage.setItem('exhale_token', response.token);
    setUser(response.user);
    return response;
  };

  const register = async (anonymousName, email, password) => {
    const response = await authService.register(anonymousName, email, password);
    localStorage.setItem('exhale_token', response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('exhale_token');
    setUser(null);
  };

  const updateTokens = (newBalance) => {
    setUser(prev => ({ ...prev, tokens: newBalance }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateTokens,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## 9. Core Features Specification

### 9.1 Token Reward System

| Action | Tokens Earned |
|--------|--------------|
| Create a post | +5 tokens |
| Comment on a post | +2 tokens |
| Reply to a comment | +1 token |
| Receive a reaction on post | +1 token (max 10/post) |
| Daily login bonus | +3 tokens |

**Implementation Notes:**
- Tokens are updated atomically in the database
- Token balance returned with each action response
- Prevent gaming: Max 10 posts per day, max 50 comments per day

### 9.2 Auto-Deletion Timer

**Backend Scheduler (backend/utils/scheduler.js)**
```javascript
const cron = require('node-cron');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const initScheduler = () => {
  // Run every minute to check for posts to delete
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      
      // Find posts scheduled for deletion
      const postsToDelete = await Post.find({
        'autoDelete.enabled': true,
        'autoDelete.deleteAt': { $lte: now },
        isVisible: true
      });

      for (const post of postsToDelete) {
        // Delete associated comments
        await Comment.deleteMany({ post: post._id });
        
        // Delete the post
        await Post.findByIdAndDelete(post._id);
        
        console.log(`Auto-deleted post: ${post._id}`);
      }
    } catch (error) {
      console.error('Scheduler error:', error);
    }
  });

  console.log('Auto-deletion scheduler initialized');
};

module.exports = initScheduler;
```

### 9.3 Mood Tags

```javascript
// Constants for moods
const MOODS = {
  happy: {
    label: 'Happy',
    color: 'green',
    emoji: '😊',
    bgClass: 'bg-green-500/20',
    textClass: 'text-green-400'
  },
  sad: {
    label: 'Sad',
    color: 'blue',
    emoji: '😢',
    bgClass: 'bg-blue-500/20',
    textClass: 'text-blue-400'
  },
  angry: {
    label: 'Angry',
    color: 'red',
    emoji: '😠',
    bgClass: 'bg-red-500/20',
    textClass: 'text-red-400'
  },
  anxious: {
    label: 'Anxious',
    color: 'yellow',
    emoji: '😰',
    bgClass: 'bg-yellow-500/20',
    textClass: 'text-yellow-400'
  },
  confused: {
    label: 'Confused',
    color: 'purple',
    emoji: '😕',
    bgClass: 'bg-purple-500/20',
    textClass: 'text-purple-400'
  },
  neutral: {
    label: 'Neutral',
    color: 'gray',
    emoji: '😐',
    bgClass: 'bg-gray-500/20',
    textClass: 'text-gray-400'
  },
  hopeful: {
    label: 'Hopeful',
    color: 'teal',
    emoji: '🌟',
    bgClass: 'bg-teal-500/20',
    textClass: 'text-teal-400'
  },
  grateful: {
    label: 'Grateful',
    color: 'pink',
    emoji: '🙏',
    bgClass: 'bg-pink-500/20',
    textClass: 'text-pink-400'
  }
};
```

---

## 10. Security Requirements

### 10.1 Backend Security Measures

#### Rate Limiting (backend/middleware/rateLimiter.js)
```javascript
const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});

// Auth routes rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 attempts per hour
  message: {
    success: false,
    message: 'Too many login attempts, please try again later'
  }
});

// Post creation rate limiter
const postLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // 10 posts per day
  message: {
    success: false,
    message: 'Daily post limit reached. Try again tomorrow.'
  }
});

module.exports = { apiLimiter, authLimiter, postLimiter };
```

#### Input Validation (backend/utils/validators.js)
```javascript
const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('anonymousName')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Anonymous name must be 3-30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Anonymous name can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
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
```

### 10.2 Security Headers (Helmet)
```javascript
// In server.js
const helmet = require('helmet');

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
  }
}));
```

### 10.3 MongoDB Security
- Use Mongoose for all database operations (prevents NoSQL injection)
- Never expose ObjectIds that could leak user identity
- Sanitize all user inputs before database operations
- Use parameterized queries only

### 10.4 Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Hashed using bcryptjs with salt rounds of 12

---

## 11. Environment Configuration

### 11.1 Backend .env
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/exhale
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/exhale?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long_and_random
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Token Rewards
TOKENS_PER_POST=5
TOKENS_PER_COMMENT=2
TOKENS_PER_REPLY=1
TOKENS_PER_REACTION_RECEIVED=1
DAILY_LOGIN_BONUS=3
```

### 11.2 Frontend .env
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Exhale
VITE_APP_DESCRIPTION=Anonymous Emotional Venting Platform

# Feature Flags (optional)
VITE_ENABLE_AUTO_DELETE=true
VITE_MAX_POST_LENGTH=5000
VITE_MAX_COMMENT_LENGTH=2000
```

### 11.3 .env.example Files
Create `.env.example` files in both frontend and backend with all keys but empty/placeholder values for documentation.

---

## 12. Step-by-Step Setup Guide

### 12.1 Prerequisites
1. Install Node.js v16+ from https://nodejs.org
2. Install MongoDB locally or create a MongoDB Atlas account
3. Install Git
4. Install a code editor (VS Code recommended)

### 12.2 Backend Setup

```bash
# 1. Create project folder
mkdir exhale
cd exhale

# 2. Create backend folder
mkdir backend
cd backend

# 3. Initialize npm project
npm init -y

# 4. Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken express-validator helmet express-rate-limit node-cron

# 5. Install dev dependencies
npm install -D nodemon

# 6. Create folder structure
mkdir config controllers middleware models routes utils

# 7. Create .env file (copy from .env.example and fill in values)
cp .env.example .env

# 8. Start development server
npm run dev
```

### 12.3 Frontend Setup

```bash
# 1. Go back to main project folder
cd ..

# 2. Create Vite React project
npm create vite@latest frontend -- --template react

# 3. Navigate to frontend
cd frontend

# 4. Install dependencies
npm install react-router-dom axios lucide-react sonner

# 5. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 6. Create .env file
cp .env.example .env

# 7. Start development server
npm run dev
```

### 12.4 Connecting Frontend to Backend

#### Frontend API Service (frontend/src/services/api.js)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('exhale_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('exhale_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
```

#### Backend CORS Configuration (backend/server.js)
```javascript
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
  origin: process.env.FRONTEND_URL,
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
```

#### Database Connection (backend/config/db.js)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 6+ doesn't need these options anymore
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 13. Razorpay Integration Preparation

### 13.1 Future Integration Points

The token system is designed to be compatible with Razorpay payments:

1. **Token Purchase Page** - Users can buy tokens
2. **Premium Features** - Unlock with tokens purchased via Razorpay
3. **Database Ready** - User model has `tokens` field

### 13.2 Prepared Structure

```javascript
// Future: backend/routes/paymentRoutes.js
// POST /api/payments/create-order - Create Razorpay order
// POST /api/payments/verify - Verify payment and credit tokens

// Future: backend/models/Transaction.js
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount: Number,
  tokensPurchased: Number,
  status: { type: String, enum: ['pending', 'completed', 'failed'] },
  createdAt: { type: Date, default: Date.now }
});
```

### 13.3 Reference Implementation
See: https://github.com/aravindanirudh/fullstack-ecommerce-website-tutorial-compiletab

---

## 14. UI/UX Specifications

### 14.1 Dark Mode Color Palette

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Dark mode backgrounds
        dark: {
          bg: '#0f0f0f',
          card: '#1a1a1a',
          border: '#2a2a2a',
          hover: '#252525',
        }
      }
    }
  }
}
```

### 14.2 Typography
- Headings: Inter or system-ui
- Body: Inter or system-ui
- Monospace: JetBrains Mono (for code/tokens display)

### 14.3 Component Styling Guidelines

```jsx
// Example Card Component with Dark Mode
<div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:bg-dark-hover transition-colors">
  {/* Card content */}
</div>

// Example Button Styles
// Primary
<button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  Submit
</button>

// Secondary
<button className="bg-dark-card hover:bg-dark-hover border border-dark-border text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors">
  Cancel
</button>
```

### 14.4 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 15. Testing Requirements

### 15.1 Backend Testing Checklist

- [ ] User registration with valid data
- [ ] User registration with duplicate email (should fail)
- [ ] User registration with weak password (should fail)
- [ ] User login with correct credentials
- [ ] User login with incorrect credentials (should fail)
- [ ] Create post as authenticated user
- [ ] Create post as guest (should fail)
- [ ] Add reaction to post
- [ ] Toggle reaction (add/remove)
- [ ] Create comment on post
- [ ] Reply to comment
- [ ] Delete own post
- [ ] Delete other user's post (should fail)
- [ ] Admin delete any post
- [ ] Auto-deletion after timer expires
- [ ] Token rewards are correctly applied
- [ ] Rate limiting works correctly

### 15.2 Frontend Testing Checklist

- [ ] Homepage renders correctly
- [ ] Login form validation
- [ ] Registration form validation
- [ ] Protected routes redirect to login
- [ ] Posts display on venting wall
- [ ] Infinite scroll/pagination works
- [ ] Create post flow works
- [ ] Mood selector works
- [ ] Auto-delete timer selection works
- [ ] Reactions update in real-time
- [ ] Comments display correctly
- [ ] Reply functionality works
- [ ] Profile page shows correct data
- [ ] Token balance updates after actions
- [ ] Admin dashboard accessible only to admins
- [ ] Responsive design on all breakpoints
- [ ] Toast notifications appear correctly

---

## Appendix A: Error Codes

| Code | Message | Description |
|------|---------|-------------|
| AUTH001 | Invalid credentials | Wrong email or password |
| AUTH002 | Token expired | JWT has expired |
| AUTH003 | No token provided | Missing authorization header |
| AUTH004 | Account deactivated | User account is disabled |
| POST001 | Post not found | Invalid post ID |
| POST002 | Not authorized | User doesn't own this post |
| POST003 | Daily limit reached | Max 10 posts per day |
| COMMENT001 | Comment not found | Invalid comment ID |
| COMMENT002 | Post closed | Cannot comment on deleted post |
| RATE001 | Too many requests | Rate limit exceeded |

---

## Appendix B: API Response Format

All API responses follow this consistent format:

```json
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "errors": [ /* validation errors array, if applicable */ ]
}
```

---

## Appendix C: Quick Reference Commands

```bash
# Backend
cd backend
npm run dev          # Start with nodemon
npm start            # Production start

# Frontend
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build

# MongoDB (local)
mongod               # Start MongoDB server
mongosh              # MongoDB shell
```

---

**End of PRD Document**