'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/api/users/me/');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Clear any previous tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];

      const tokenResponse = await axios.post('/api/users/token/', {
        email,
        password,
      });

      const { access, refresh, user } = tokenResponse.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      setUser(user);

      // Redirect based on user role
      if (user.role === 'EMPLOYER') {
        router.push('/employers/dashboard');
      } else if (user.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/jobseekers/dashboard');
      }

      return user;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      throw new Error('Login failed. Please try again.');
    }
  };

  const register = async (userData) => {
    try {
      const registerResponse = await axios.post('/api/users/register/', userData);
      const loginResponse = await axios.post('/api/token/', {
        email: userData.email,
        password: userData.password,
      });

      const { access, refresh } = loginResponse.data;
      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      const userResponse = await axios.get('/api/users/me/');
      setUser(userResponse.data);

      return userResponse.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};