import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DashboardStore {
  darkMode: boolean
  toggleDarkMode: () => void
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
)