import {
  Home as HomeIcon,
  Settings as SettingIcon,
  LogOut,
  User,
  Users,
  List,
} from "lucide-react";
import routes from "../../routes";
import { INavItem } from "../../types/INavItem";
import { useDashboardStore } from "../../store/DashboardStore";
import { NavItem } from "../../components/Layout/NavItem";
import Loader from "../../components/Common/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TypeToastEnum } from "../../types/IToast";

const navItems: INavItem[] = [
  { icon: HomeIcon, label: "Inicio", href: "/" },
  {
    icon: SettingIcon,
    label: "Administracion",
    href: "/administracion",
    subItems: [
      { icon: Users, label: "Clientes", href: "/administracion/clientes" },
      { icon: User, label: "Usuarios", href: "/administracion/usuarios" },
      { icon: List, label: "Parámetros", href: "/administracion/parametros" },
    ],
  },
  // {
  //   icon: List,
  //   label: "Caestras",
  //   href: "/administracion",
  //   subItems: [
  //     { icon: Users, label: "Clientes", href: "/administracion/clientes" },
  //     { icon: User, label: "Usuarios", href: "/administracion/usuarios" },
  //   ],
  // },
];

export function Layout() {
  const { darkMode, logout, loading, errors, setErrorsToast } = useDashboardStore();

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((item) => {
        switch (item.type) {
          case TypeToastEnum.Error:
            toast.error(item.message);
            break;
          case TypeToastEnum.Warning:
            toast.warning(item.message);
            break;
          case TypeToastEnum.Susccess:
            toast.success(item.message);
            break;
        }
        setErrorsToast([]);
      });
    }
  }, [errors]);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {loading && <Loader />}
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <header className="bg-purple-700 dark:bg-gray-800 shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white dark:text-white">
                  CreadiApp
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                  />
                ))}
                <button
                  onClick={logout}
                  className="p-2 rounded-full text-white dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Logout"
                >
                  <LogOut
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mt-4">{routes}</div>
        </main>
      </div>
    </div>
  );
}
