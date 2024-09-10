import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IToast } from "../types/IToast";

interface ILogin {
  apiURL: string;
  pageName: string;
}

interface DashboardStore {
  sessionData: ILogin;
  darkMode: boolean;
  toggleDarkMode: () => void;
  loading: boolean;
  setLoader: (status: boolean) => void;
  showDrawer: boolean;
  toggleDrawer: (status:boolean) => void;
  errors: IToast[];
  setErrorsToast: (errors: IToast[]) => void;
  isAuthenticated: boolean;
  login: () => void;
  setSessionData: (data: ILogin) => void;
  logout: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      sessionData: { apiURL: "", pageName: "" },
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      loading: false,
      setLoader: (status) => set(() => ({ loading: status })),
      showDrawer: false,
      toggleDrawer: (status:boolean) => set(() => ({ showDrawer: status })),
      errors: [],
      setErrorsToast: (errors) => set(() => ({ errors: errors })),
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      setSessionData: (data: ILogin) => set({ sessionData: data }),
      logout: () =>
        set({
          isAuthenticated: false,
          sessionData: { apiURL: "", pageName: "" },
        }),
    }),
    {
      name: "dashboard-storage",
    }
  )
);
