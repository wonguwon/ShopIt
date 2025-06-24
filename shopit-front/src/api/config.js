const { VITE_API_URL, VITE_API_TIMEOUT = 5000, VITE_API_VERSION = 'v1' } = import.meta.env;

export const API_CONFIG = {
  // BASE_URL: `${VITE_API_URL}/${VITE_API_VERSION}`,
  BASE_URL: `${VITE_API_URL}/`,
  TIMEOUT: VITE_API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json', //내가 서버에 보내는 데이터의 형식은 JSON
    Accept: 'application/json', //너도 JSON으로 응답해줘
  },
};

export const API_ENDPOINTS = {
  PRODUCTS: {
    BASE: '/products',
    DETAIL: (id) => `/products/${id}`,
    SEARCH: (query) => `/products?q=${query}`,
    CATEGORY: (category) => `/products?category=${category}`,
  },
  CART: {
    BASE: '/cart',
    ADD: '/cart',
    UPDATE: (id) => `/cart/${id}`,
    DELETE: (id) => `/cart/${id}`,
  },
  USERS: {
    BASE: '/users',
    // LOGIN: '/users/login',
    LOGIN: (email, password) => `/users?email=${email}&password=${password}`,
    DELETE: (email) => `/users/${email}`,
    EDIT: (email) => `/users/${email}`,
    CHECK_EMAIL: (email) => `/users?email=${email}`,
  },
  ORDERS: {
    BASE: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    USER: (email) => `/orders/user/${email}`,
  },
  QUESTIONS: {
    BASE: '/questions',
    DETAIL: (id) => `/questions/${id}`,
    UPDATE: (id) => `/questions/${id}`,
    DELETE: (id) => `/questions/${id}`,
    SEARCH: (query) => `/questions?q=${query}`,
  },
};
