/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IToast } from "../types/IToast";
const user = JSON.parse(localStorage.getItem("user") || "{}");

interface ILogin {
  apiURL: string;
  pageName: string;
}

interface DashboardStore {
  sessionData: ILogin;
  openModal: boolean;
  setOpenModal: (status: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  loading: boolean;
  setLoader: (status: boolean) => void;
  showDrawer: boolean;
  toggleDrawer: (status: boolean) => void;
  errors: IToast[];
  setErrorsToast: (errors: IToast[]) => void;
  isAuthenticated: boolean;
  login: () => void;
  setSessionData: (data: ILogin) => void;
  logout: () => void;
  validarPermiso: (pantalla: string) => boolean;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      sessionData: { apiURL: "", pageName: "" },
      openModal: false,
      setOpenModal: (status: boolean) => set(() => ({ openModal: status })),
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      loading: false,
      setLoader: (status) => set(() => ({ loading: status })),
      showDrawer: false,
      toggleDrawer: (status: boolean) => set(() => ({ showDrawer: status })),
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
      validarPermiso: (pantalla: string) => {
        let ver = false;
        const acceso = user.roles_permiso.find(
          (x: any) => x.Pantalla === pantalla
        );
        if (acceso) {
          const RolDetalle = acceso.roles_detalles.find(
            (x: any) => x.RolPermisoId === acceso.Id
          );
          if (RolDetalle) ver = RolDetalle.Ver;
        }
        return ver;
      },
    }),
    {
      name: "dashboard-storage",
    }
  )
);
