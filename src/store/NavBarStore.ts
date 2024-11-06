import {
  CalendarDays,
  ChartNetwork,
  CircleUserRound,
  Handshake,
  List,
  LogOut,
  Receipt,
  Route,
  SettingsIcon,
  Store,
  User,
  User2,
  UserCog,
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
        { icon: List, name: "Maestras", path: "/administracion/parametros" },
        { icon: UserCog, name: "Roles", path: "/administracion/roles" },
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
      subItems: [
        { icon: Receipt, name: "Coteos", path: "/reportes/coteos" },
        {
          icon: CalendarDays,
          name: "Nómina mensual",
          path: "/reportes/mensual",
        },
        { icon: Handshake, name: "Cuentas", path: "/reportes/cuentas" },
      ],
    },
    {
      icon: User2,
      name: "",
      path: "/",
      subItems: [
        { icon: CircleUserRound, name: "Mi perfil", path: "/perfil" },
        { icon: Store, name: "Cambiar empresa", path: "/" },
        { icon: LogOut, name: "Cerrar sesión", path: "/" },
      ],
    },
  ],
  openSubmenu: null,
  isMobileMenuOpen: false,
  setOpenSubmenu: (submenu) => set({ openSubmenu: submenu }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  closeAllMenus: () => set({ openSubmenu: null, isMobileMenuOpen: false }),
}));
