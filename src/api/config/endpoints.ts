// Use environment variable with fallback to your specific URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://34.47.167.0/api/v1';

export const ENDPOINTS = {
  BASE_URL,

  // Auth endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    PROFILE: `${BASE_URL}/auth/profile`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${BASE_URL}/auth/verify-email`,
  },

  // User endpoints
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
  },

  // Products endpoints
  PRODUCTS: {
    GET: `${BASE_URL}/products`,
    ADD: `${BASE_URL}/products`,
    DELETE: `${BASE_URL}/products/:id`,
  },
} as const;
