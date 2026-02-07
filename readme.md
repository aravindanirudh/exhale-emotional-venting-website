# Exhale - Anonymous Emotional Venting Platform

![Exhale Icon](frontend/public/favicon.ico)

**Exhale** is a safe, anonymous space where you can pour your heart out without fear of judgment. It is a full-stack web application designed to help users express their emotions, receive support from the community, and find relief through anonymous sharing.

> "A problem shared is a problem halved."

## 🚀 Features

- **Anonymous Venting**: Share your thoughts and feelings without revealing your identity.
- **Mood Tagging**: Categorize your posts by mood (Happy, Sad, Angry, Anxious, etc.) to help others understand your state of mind.
- **Community Support**: Receive supportive reactions (❤️, 🤗, 💪) and comments from empathetic users.
- **Auto-Deletion**: Optional self-destruct timer for posts (1h, 24h, etc.) for enhanced privacy.
- **Token System**: Earn virtual tokens for engaging with the community (posting, commenting, reacting).
- **Safe Environment**: Moderation tools to keep the community positive and supportive.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose 9)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, Express Rate Limit, Express Validator, BCryptJS
- **Scheduling**: Node-cron (for auto-deleting posts)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm** (Node Package Manager)
- **MongoDB**: A local instance or a cloud database (MongoDB Atlas)

## 🔧 Installation & Setup

Cloning the repository and setting up the project takes just a few minutes.

### 1. Clone the Repository
```bash
git clone https://github.com/aravindanirudh/exhale-emotional-venting-website.git
cd exhale-website
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure environment variables.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exhale_db  # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional if using defaults, but recommended):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
# Application will run on http://localhost:5173
```

## 📂 Project Structure

```
exhale-website/
├── backend/                 # Node.js/Express Backend
│   ├── config/              # Database connection
│   ├── controllers/         # Request logic
│   ├── middleware/          # Auth, Error handling, Rate limiting
│   ├── models/              # Mongoose schemas (User, Post, Comment)
│   ├── routes/              # API Routes
│   ├── utils/               # Helper functions
│   └── server.js            # Entry point
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth & Theme context
│   │   ├── pages/           # Application pages (Home, Login, Wall...)
│   │   ├── services/        # API calls (Axios setup)
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   └── index.html
│
└── Exhale_PRD.md            # Product Requirements Document
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | | |
| POST | `/api/auth/register` | Register a new anonymous user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user's profile |
| **Posts** | | |
| GET | `/api/posts` | Get all posts (paginated) |
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts/:id` | Get a specific post |
| DELETE | `/api/posts/:id` | Delete own post |
| POST | `/api/posts/:id/react`| React to a post |
| **Comments** | | |
| GET | `/api/comments/post/:id`| Get comments for a post |
| POST | `/api/comments` | Add a comment |

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Exhale, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🗒️ To-do (aka future plans)
These are just some ideas and may or may not be implemented :P

- Improve hero section (landing page or homepage)
- Add contact section
- Loading be patient section (in posts)

## 📧 Contact
- Project Author: [Aravind A Kamath](https://github.com/aravindanirudh)