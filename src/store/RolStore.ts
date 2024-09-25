import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IRolePermiso, IRolePermisoData } from "../types/IRolPermiso";
import { IItemsCBox } from "../types/IRuta";

interface UserStore {
  permisos: IRolePermiso[];
  setPermisos: (users: IRolePermisoData) => void;
  roles: IItemsCBox[];
  setRoles: (roles: IItemsCBox[]) => void;
  vaciarRoles: () => void;
  vaciarPermisos: () => void;
}

export const useRolStore = create<UserStore>()(
  persist(
    (set) => ({
      permisos: [],
      setPermisos: (data: IRolePermisoData) => set({ permisos: data.data }),
      roles: [],
      setRoles: (roles: IItemsCBox[]) => set({ roles: roles }),
      vaciarRoles: () => set({ roles: [] }),
      vaciarPermisos: () => set({ permisos: [] }),
    }),
    {
      name: "dashboard-storage",
    }
  )
);
