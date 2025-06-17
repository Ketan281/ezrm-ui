import { create } from "zustand"

interface UIState {
  // Navigation
  sidebarOpen: boolean
  mobileMenuOpen: boolean

  // Theme
  theme: "light" | "dark" | "system"

  // Loading states
  globalLoading: boolean

  // Modals
  modals: Record<string, boolean>

  // Notifications
  notifications: Array<{
    id: string
    type: "success" | "error" | "warning" | "info"
    message: string
    timestamp: number
  }>

  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  setTheme: (theme: "light" | "dark" | "system") => void
  setGlobalLoading: (loading: boolean) => void
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  addNotification: (notification: Omit<UIState["notifications"][0], "id" | "timestamp">) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  theme: "system",
  globalLoading: false,
  modals: {},
  notifications: [],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  setTheme: (theme) => set({ theme }),

  setGlobalLoading: (loading) => set({ globalLoading: loading }),

  openModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    })),

  closeModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    })),

  addNotification: (notification) => {
    const id = Date.now().toString()
    const timestamp = Date.now()
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id, timestamp }],
    }))

    // Auto remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id)
    }, 5000)
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}))
