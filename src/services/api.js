// src/services/api.js

import axios from 'axios';
import router from '../router/index';
import TokenService from './token.service';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor: attach Bearer token
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      TokenService.removeToken();             // Remove token if unauthorized
      router.push({ name: 'Home' });          // Redirect to Home page
    }
    return Promise.reject(error);
  }
);

export default instance;
