import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useNavbarStore } from "../../store/NavBarStore";
import { useDashboardStore } from "../../store/DashboardStore";

export const NavBar: React.FC = () => {
  const {
    menuItems,
    openSubmenu,
    isMobileMenuOpen,
    setOpenSubmenu,
    setMobileMenuOpen,
    closeAllMenus,
  } = useNavbarStore();
  const { logout } = useDashboardStore();

  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAllMenus]);

  useEffect(() => {
    closeAllMenus();
  }, [location, closeAllMenus]);

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <header className="bg-sky-700 dark:bg-gray-800 shadow">
      <nav
        className="max-w mx-auto px-4 sm:px-6 lg:px-8"
        ref={menuRef}
      >
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <span className="text-white dark:text-white">
              <span className="text-2xl font-bold">
                <Link to="/">CreadiApp</Link>
              </span>
              <span className="text-2xl font-normal"> | </span>
              <span className="font-light">Gestión de cartera</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
              >
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-white dark:text-gray-200 hover:text-white dark:hover:text-white hover:bg-sky-500 dark:hover:bg-gray-700 ${
                    location.pathname === item.path
                      ? "border-indigo-500 text-gray-900"
                      : ""
                  }`}
                >
                  <item.icon
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.subItems && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
                {item.subItems && openSubmenu === item.name && (
                  <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <subItem.icon
                          className="inline-block w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
        <div className="-mr-2 flex items-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú principal</span>
            {isMobileMenuOpen ? (
              <X
                className="block h-6 w-6"
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="block h-6 w-6"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left flex justify-between items-center ${
                      location.pathname === item.path
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : ""
                    }`}
                  >
                    {item.name}
                    {item.subItems && <ChevronDown className="h-4 w-4" />}
                  </button>
                  {item.subItems && openSubmenu === item.name && (
                    <div className="bg-gray-50 pl-6">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
