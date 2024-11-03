import { create } from "zustand";
import { IUsuario, IUsuarios, UsuarioVacio } from "../types/IUsuario";
import { IItemsCBox } from "../types/IRuta";
import { IPermiso, IRolePermisoData } from "../types/IRolPermiso";

interface UserStore {
  usuarios: IUsuario[];
  setClientes: (users: IUsuarios) => void;
  rutas: IItemsCBox[];
  setRutas: (rutas: IItemsCBox[]) => void;
  roles: IItemsCBox[];
  setRoles: (roles: IItemsCBox[]) => void;
  permisos: IPermiso[];
  setPermisos: (data: IRolePermisoData) => void;
  setPermiso: (index: number, updatedPermiso: Partial<IPermiso>) => void;
  setVaciarPermisos: () => void;
  formData: IUsuario;
  setFormData: (data: Partial<IUsuario>) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  usuarios: [],
  setClientes: (users: IUsuarios) => set({ usuarios: users.data }),
  rutas: [],
  setRutas: (rutas: IItemsCBox[]) => set({ rutas: rutas }),
  roles: [],
  setRoles: (roles: IItemsCBox[]) => set({ roles: roles }),
  permisos: [],
  setPermisos: (data: IRolePermisoData) => {
    const permisos: IPermiso[] = [];
    data.data.map((item) => {
      const find = data.permisos.find((row) => row.rol_permiso_id === item.id);
      permisos.push({
        id_view: item.id,
        view: item.pantalla,
        editar: find ? find.editar : false,
        ver: find ? find.ver : false,
        especial: find ? find.especial : false,
        idPermmision: find ? find.id : null,
      });
    });
    set({ permisos: permisos });
  },
  setPermiso: (index: number, updatedPermiso: Partial<IPermiso>) => {
    set((state) => {
      const permisosActualizados = [...state.permisos];
      permisosActualizados[index] = {
        ...permisosActualizados[index],
        ...updatedPermiso,
      };
      return { permisos: permisosActualizados };
    });
  },
  setVaciarPermisos: () => set({ permisos: [] }),
  formData: UsuarioVacio,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
