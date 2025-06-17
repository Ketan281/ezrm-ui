export const API_KEYS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    LOGOUT: "auth/logout",
    PROFILE: "auth/profile",
    REFRESH: "auth/refresh",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
    VERIFY_EMAIL: "auth/verify-email",
  },
  // User endpoints
  USER: {
    GET_PROFILE: "user/profile",
    UPDATE_PROFILE: "user/profile",
    CHANGE_PASSWORD: "user/change-password",
  },
  // Add more endpoint groups as needed
} as const
