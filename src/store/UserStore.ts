import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUsuarios } from '../types/IUsuario'

interface UserStore {
  usuarios: IUsuarios;
  setClientes: (users: IUsuarios) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      usuarios: { data : []},
      setClientes: (users : IUsuarios) => set({ usuarios: users }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
)