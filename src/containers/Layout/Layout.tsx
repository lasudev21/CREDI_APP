import {
  Home as HomeIcon,
  Settings as SettingIcon,
  Sun,
  Moon,
  LogOut,
  User,
  Users,
} from "lucide-react";
import routes from "../../routes";
import { INavItem } from "../../types/INavItem";
import { useDashboardStore } from "../../store/store";
import { NavItem } from "../../components/Layout/NavItem";

const navItems: INavItem[] = [
  { icon: HomeIcon, label: "Home", href: "/" },
  {
    icon: SettingIcon,
    label: "administracion",
    href: "/administracion",
    subItems: [
      { icon: Users, label: "Clientes", href: "/administracion/clientes" },
      { icon: User, label: "Usuarios", href: "/administracion/usuarios" },
    ],
  },
];

export function Layout() {
  const darkMode = useDashboardStore((state) => state.darkMode);
  const toggleDarkMode = useDashboardStore((state) => state.toggleDarkMode);
  const logout = useDashboardStore((state) => state.logout);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  CreadiFenix V2
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
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Moon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
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
