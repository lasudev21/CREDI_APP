import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IToast } from "../types/IToast";

interface DashboardStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  loading: boolean;
  setLoader: (status: boolean) => void;
  showDrawer: boolean;
  toggleDrawer: () => void;
  errors: IToast[];
  setErrorsToast: (errors: IToast[]) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      loading: false,
      setLoader: (status) => set(() => ({ loading: status })),
      showDrawer: false,
      toggleDrawer: () => set((state) => ({ showDrawer: !state.showDrawer })),
      errors: [],
      setErrorsToast: (errors) => set(() => ({ errors: errors })),
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "dashboard-storage",
    }
  )
);
