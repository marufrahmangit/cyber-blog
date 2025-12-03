import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API calls
export const fetchWriteups = async () => {
  const { data } = await api.get('/writeups');
  return data;
};

export const fetchWriteupBySlug = async (slug) => {
  const { data } = await api.get(`/writeups/${slug}`);
  return data;
};

export const searchWriteups = async (query) => {
  const { data } = await api.get(`/writeups/search?q=${query}`);
  return data;
};

// Auth API calls
export const login = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password });
  if (data.token) {
    Cookies.set('token', data.token, { expires: 7 });
  }
  return data;
};

export const verifyToken = async () => {
  try {
    const { data } = await api.get('/auth/verify');
    return data;
  } catch (error) {
    Cookies.remove('token');
    throw error;
  }
};

export const logout = () => {
  Cookies.remove('token');
};

// Admin API calls
export const fetchAllWriteups = async () => {
  const { data } = await api.get('/admin/writeups');
  return data;
};

export const fetchWriteupById = async (id) => {
  const { data } = await api.get(`/admin/writeups/${id}`);
  return data;
};

export const createWriteup = async (writeupData) => {
  const { data } = await api.post('/admin/writeups', writeupData);
  return data;
};

export const updateWriteup = async (id, writeupData) => {
  const { data } = await api.put(`/admin/writeups/${id}`, writeupData);
  return data;
};

export const deleteWriteup = async (id) => {
  const { data } = await api.delete(`/admin/writeups/${id}`);
  return data;
};

export default api;