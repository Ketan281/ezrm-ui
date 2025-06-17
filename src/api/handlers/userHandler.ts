import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "../services"
import { useAuthStore } from "@/store/authStore"
import type { UpdateProfileData, ChangePasswordData } from "../services"

export const useUserProfile = () => {
  const { isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => userService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateProfile = () => {
  const { updateUser } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileData) => userService.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update auth store
      updateUser(updatedUser)

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
    onError: (error) => {
      console.error("Update profile error:", error)
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => userService.changePassword(data),
    onError: (error) => {
      console.error("Change password error:", error)
    },
  })
}
