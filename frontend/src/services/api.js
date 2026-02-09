// This file creates and configures an Axios instance for making HTTP requests to the backend API. It sets the base URL, default headers, and includes interceptors to handle authentication tokens and response errors globally
import axios from 'axios'; // Brings in the Axios library for HTTP requests

// Create a custom Axios instance with predefined configuration
// The 'baseURL' sets base URL for all API calls and is set to an environment variable (VITE_API_BASE_URL) or defaults to the current hostname on port 5000
// 'headers' sets default headers for all requests, specifying JSON content type
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor intercepts all outgoing requests before they are sent to automatically include the authentication token in the Authorization header (the Bearer thingy) for all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("exhale_token"); // Retrieve the authentication token from localStorage with key 'exhale_token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // If a token exists, adds it to the request headers as a Bearer token
    }
    return config; // Returns the modified config object to proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Check end of this code file for more details
  },
);

// Response interceptor intercepts all incoming responses to handle errors globally, specifically checking for 401 (unauthorized status) to clear the token and optionally redirect to login
api.interceptors.response.use(
  (response) => response.data, // Automatically extracts response.data, so you don't need to write .data every time
  (error) => {
    // Check if the error status is 401 (Unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem("exhale_token"); // If unauthorized, remove the token from localStorage
      // Redirect to login if not already on the login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error.response?.data || error); // Rejects the promise with either the response data or the raw error. Uses optional chaining (?.) to safely access potentially undefined properties
  },
);

export default api;

// JavaScript Promises are a powerful way to handle asynchronous operations, allowing you to write cleaner and more manageable code when dealing with tasks that take time to complete, such as API calls, file reading, or timers.
// A Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Think of it as a "promise" to deliver a result in the future.

// A Promise can be in one of three states:
// Pending: Initial state, operation hasn't completed yet
// Fulfilled: Operation completed successfully
// Rejected: Operation failed

// Promise.all() is a method that:
// Takes an array of Promises
// Waits for ALL of them to resolve
// Returns a single Promise with an array of all results
// If ANY Promise rejects, the whole thing rejects immediately

// Benefits:
// Parallel execution: Both API calls happen at the same time (faster than sequential)
// All or nothing: Either both succeed or both fail
// Clean code: Get both results in one line

// Visual Comparison:
// Without Promise.all (Sequential - slower):
// const statsRes = await api.get('/admin/stats');   // Wait 500ms
// const usersRes = await api.get('/admin/users');   // Wait 500ms
// // Total time: 1000ms

// With Promise.all (Parallel - faster):
// const [statsRes, usersRes] = await Promise.all([
//   api.get('/admin/stats'),    // Both start at same time
//   api.get('/admin/users')     
// ]);
// // Total time: 500ms (whichever takes longer)