import { useState, useEffect } from "react";
import api from "../services/api"; // The custom Axios instance from api.js
import { formatDistanceToNow } from "date-fns"; // date-fns function to format dates as relative time (e.g., "2 hours ago")
import { Loader2, Trash2, Shield, Users, MessageSquare } from "lucide-react"; // SVG icons for UI elements
import { toast } from "sonner"; // Notification library (Sonner) for displaying success/error messages

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
  }); // Holds dashboard statistics with initial values of 0
  const [users, setUsers] = useState([]); // Holds the list of users, initialized as an empty array
  const [loading, setLoading] = useState(true); // Indicates whether data is currently being loaded, initialized to true

  // Runs once when component mounts (empty dependency array [])
  // Calls fetchData() to load initial data for the dashboard
  useEffect(() => {
    fetchData();
  }, []);

  // fetchData() is an async function that allows the use of await for asynchronous operations
  const fetchData = async () => {
    try {
      setLoading(true); // Shows loading indicator
      // Promise.all() makes both API calls simultaneously for better performance
      const [statsRes, usersRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
      ]);
      // Assigns responses to statsRes and usersRes using array destructuring and updates state with the retrieved data (note: since the response interceptor already extracts .data, statsRes.data actually refers to the direct response)
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false); // Hides loading indicator regardless of success or failure of API calls
    }
  };

  // toggleUserStatus() is an async function that toggles a user's active status by sending a PUT request to the backend. It takes the user's ID and current status as parameters, updates the UI optimistically, and shows a success or error toast based on the outcome
  // setUsers(): Updates users array using map
  // Finds the user by _id
  // Spreads user object and toggles isActive property
  // Returns unchanged users for others
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-status`);
      setUsers(
        users.map((u) =>
          u._id === userId ? { ...u, isActive: !currentStatus } : u,
        ),
      );
      toast.success(`User ${!currentStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  // Shows loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Shield className="w-8 h-8 mr-3 text-primary-600" />
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Total Users</h3>
            <Users className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Total Posts</h3>
            <Shield className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">{stats.totalPosts}</p>
        </div>
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-500">Total Comments</h3>
            <MessageSquare className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold">{stats.totalComments}</p>
        </div>
      </div>

      {/* User Management */}
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm overflow-x-auto border border-gray-100 dark:border-dark-border">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-dark-hover">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.anonymousName}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}
                  >
                    {user.role}
                  </span>
                </td>
                {/* Relative time - converts timestamp to "X days ago" format and 'addSuffix' adds "ago" to the output */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {user.isActive ? "Active" : "Banned"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => toggleUserStatus(user._id, user.isActive)}
                      className={`text-sm bg-red-500 p-2 rounded-md text-white ${user.isActive ? "hover:bg-red-600" : "hover:bg-green-600"}`}
                    >
                      {user.isActive ? "Ban" : "Activate"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
