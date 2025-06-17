import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services"
import { useAuthStore } from "@/store/authStore"
import type { LoginCredentials, RegisterData } from "../services"

export const useLogin = () => {
  const { login, setLoading } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      // Store tokens
      localStorage.setItem("auth-token", data.token)
      localStorage.setItem("refresh-token", data.refreshToken)

      // Update auth store
      login(data.user, data.token)

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
    onError: (error) => {
      console.error("Login error:", error)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export const useRegister = () => {
  const { setLoading } = useAuthStore()

  return useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
    onMutate: () => {
      setLoading(true)
    },
    onError: (error) => {
      console.error("Registration error:", error)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export const useLogout = () => {
  const { logout, setLoading } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: () => {
      // Clear tokens
      localStorage.removeItem("auth-token")
      localStorage.removeItem("refresh-token")

      // Update auth store
      logout()

      // Clear all queries
      queryClient.clear()
    },
    onError: (error) => {
      console.error("Logout error:", error)
      // Still logout on error
      logout()
      queryClient.clear()
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export const useProfile = () => {
  const { isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onError: (error) => {
      console.error("Forgot password error:", error)
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.resetPassword(token, password),
    onError: (error) => {
      console.error("Reset password error:", error)
    },
  })
}
