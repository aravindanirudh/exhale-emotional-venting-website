import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VentingWallPage from "./pages/VentingWallPage";
import Navbar from "./components/common/Navbar";
import CreatePostPage from "./pages/CreatePostPage";

import PostDetailPage from "./pages/PostDetailPage";

import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "./context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

import { Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";

// Layout for pages that require the standard container
const MainLayout = () => (
  <div className="container mx-auto px-4 py-8">
    <Outlet />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />
      <main className="grow">
        <Routes>
          {/* Full width HomePage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Container wrapped pages */}
          <Route element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/wall" element={<VentingWallPage />} />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
