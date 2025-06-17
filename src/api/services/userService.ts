import { api, ENDPOINTS } from "../config"
import type { User } from "./authService"

export interface UpdateProfileData {
  name?: string
  email?: string
  avatar?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export const userService = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get(ENDPOINTS.USER.PROFILE)
    return response.data
  },

  // Update profile
  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const response = await api.put(ENDPOINTS.USER.PROFILE, data)
    return response.data
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
    const response = await api.post(ENDPOINTS.USER.CHANGE_PASSWORD, data)
    return response.data
  },
}
