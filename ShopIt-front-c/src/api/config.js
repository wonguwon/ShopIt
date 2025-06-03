import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const {
  VITE_API_URL,
  VITE_API_TIMEOUT = 5000,
  VITE_API_VERSION = 'v1'
} = process.env;

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  TIMEOUT: 5000,
  VERSION: VITE_API_VERSION,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Version': VITE_API_VERSION
  }
};

export const API_ENDPOINTS = {
  PRODUCTS: {
    BASE: '/products',
    DETAIL: (id) => `/products/${id}`,
    SEARCH: (query) => `/products/search?q=${query}`,
    CATEGORY: (category) => `/products/category/${category}`
  },
  USERS: {
    BASE: '/users',
    LOGIN: '/users/login',
    PROFILE: '/users/profile',
    CHECK_EMAIL: (email) => `/users?email=${email}`
  },
  ORDERS: {
    BASE: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    USER: (userId) => `/orders/user/${userId}`
  }
}; 