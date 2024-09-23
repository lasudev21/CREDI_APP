import {
  ChartNetwork,
  List,
  Receipt,
  Route,
  SettingsIcon,
  User,
  Users,
} from "lucide-react";
import { create } from "zustand";

type MenuItem = {
  name: string;
  path: string;
  subItems?: MenuItem[];
  icon: React.ElementType;
};

type NavbarStore = {
  menuItems: MenuItem[];
  openSubmenu: string | null;
  isMobileMenuOpen: boolean;
  setOpenSubmenu: (submenu: string | null) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  closeAllMenus: () => void;
};

export const useNavbarStore = create<NavbarStore>((set) => ({
  menuItems: [
    {
      name: "Administracion",
      path: "/administracion",
      icon: SettingsIcon,
      subItems: [
        { icon: Users, name: "Clientes", path: "/administracion/clientes" },
        { icon: User, name: "Usuarios", path: "/administracion/usuarios" },
        { icon: List, name: "Parámetros", path: "/administracion/parametros" },
      ],
    },
    {
      icon: Receipt,
      name: "Cobros",
      path: "/cobros",
      subItems: [
        { icon: Route, name: "Rutas", path: "/cobros/rutas" },
        { icon: User, name: "Flujo de caja", path: "/cobros/flujocaja" },
        {
          icon: User,
          name: "Flujo de utilidades",
          path: "/cobros/flujoutilidades",
        },
      ],
    },
    {
      icon: ChartNetwork,
      name: "Reportes",
      path: "/reportes",
      subItems: [{ icon: Receipt, name: "Coteos", path: "/reportes/coteos" }],
    },
  ],
  openSubmenu: null,
  isMobileMenuOpen: false,
  setOpenSubmenu: (submenu) => set({ openSubmenu: submenu }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  closeAllMenus: () => set({ openSubmenu: null, isMobileMenuOpen: false }),
}));
