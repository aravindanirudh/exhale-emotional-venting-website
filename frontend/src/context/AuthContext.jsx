import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('exhale_token');
    if (token) {
      authService.getMe()
        .then(response => {
           // API returns { success: true, data: user } for getMe
           // but login/register returns { success: true, data: { user, token } }
           // Adjust based on actual API response structure
           setUser(response.data || response); 
        })
        .catch(() => localStorage.removeItem('exhale_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      console.log('Login API Response:', response);
      
      // Robust handling for nested data structures
      // 1. If interceptor worked: response is Body { success: true, data: { ... } }
      // 2. If interceptor failed: response is AxiosObject { data: Body, ... }
      const responseBody = response.data && !response.success ? response.data : response;
      const authData = responseBody.data || responseBody;
      
      console.log('Parsed Auth Data:', authData);

      if (authData?.token) {
        localStorage.setItem('exhale_token', authData.token);
        setUser(authData.user);
        return responseBody;
      }
      return response;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const register = async (anonymousName, email, password) => {
    try {
      const response = await authService.register(anonymousName, email, password);
      console.log('Register API Response:', response);

      const responseBody = response.data && !response.success ? response.data : response;
      const authData = responseBody.data || responseBody;
      
      console.log('Parsed Register Data:', authData);

      if (authData?.token) {
        localStorage.setItem('exhale_token', authData.token);
        setUser(authData.user);
        return responseBody;
      }
      return response;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('exhale_token');
    setUser(null);
  };

  const updateTokens = (newBalance) => {
    setUser(prev => prev ? ({ ...prev, tokens: newBalance }) : null);
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
      {!loading && children}
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
