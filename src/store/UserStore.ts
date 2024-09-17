import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUsuario, IUsuarios, UsuarioVacio } from "../types/IUsuario";

interface UserStore {
  usuarios: IUsuarios;
  setClientes: (users: IUsuarios) => void;
  formData: IUsuario;
  setFormData: (data: Partial<IUsuario>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      usuarios: { data: [] },
      setClientes: (users: IUsuarios) => set({ usuarios: users }),
      formData: UsuarioVacio,
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
    }),
    {
      name: "dashboard-storage",
    }
  )
);
