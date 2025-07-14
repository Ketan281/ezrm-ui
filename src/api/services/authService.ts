import { api, ENDPOINTS } from '../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, userData);
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post(ENDPOINTS.AUTH.LOGOUT);
  },

  // Get profile
  getProfile: async (): Promise<User> => {
    const response = await api.get(ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await api.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (
    token: string,
    password: string
  ): Promise<{ message: string }> => {
    const response = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password,
    });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post(ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
    return response.data;
  },
};
