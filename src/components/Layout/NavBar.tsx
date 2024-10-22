/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavbarStore } from "../../store/NavBarStore";
import { useDashboardStore } from "../../store/DashboardStore";
import SwitchCompany from "./SwitchCompany";
import DrawerCompany from "../Common/DrawerCompany";

export const NavBar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {
    menuItems,
    openSubmenu,
    isMobileMenuOpen,
    setOpenSubmenu,
    setMobileMenuOpen,
    closeAllMenus,
  } = useNavbarStore();
  const { logout, toggleDrawerCompany, showDrawerCompany, isMobile } =
    useDashboardStore();

  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toggleDrawerCompany(false);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAllMenus, toggleDrawerCompany]);

  useEffect(() => {
    closeAllMenus();
  }, [location, closeAllMenus]);

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const handleSwitchCompany = () => {
    toggleDrawerCompany(true);
  };

  return (
    <header className="bg-sky-700 shadow">
      {showDrawerCompany && (
        <DrawerCompany
          content={<SwitchCompany />}
          title="Cambiar empresa"
          size={isMobile ? "w-full" : "w-1/4"}
        />
      )}
      <nav
        className="max-w mx-auto px-4 sm:px-6 lg:px-8"
        ref={menuRef}
      >
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <span className="text-white">
              <span className="text-2xl font-bold">
                <Link to="/">CreadiApp</Link>
              </span>
              <span className="text-2xl font-normal"> | </span>
              <span className="font-light">Gestión de cartera</span>
            </span>
          </div>
          {/* Botones y menú para dispositivos grandes */}
          <div className="hidden sm:flex items-center space-x-4">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
              >
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-sky-500 ${
                    location.pathname === item.path
                      ? "border-indigo-500 text-gray-900"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                  {item.subItems && <ChevronDown className="ml-2 h-4 w-4" />}
                </button>
                {item.subItems && openSubmenu === item.name && (
                  <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {item.subItems.map((subItem) => {
                      if (subItem.name === "Cerrar sesión") {
                        return (
                          <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={logout}
                          >
                            <subItem.icon
                              className="inline-block w-4 h-4 mr-2"
                              aria-hidden="true"
                            />
                            {subItem.name}
                          </div>
                        );
                      } else if (subItem.name === "Cambiar empresa") {
                        return (
                          <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleSwitchCompany}
                          >
                            <subItem.icon
                              className="inline-block w-4 h-4 mr-2"
                              aria-hidden="true"
                            />
                            {subItem.name}
                          </div>
                        );
                      } else {
                        const acceso = user.roles_permiso.find(
                          (x: any) => x.Pantalla === subItem.name
                        );
                        if (acceso) {
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <subItem.icon
                                className="inline-block w-4 h-4 mr-2"
                                aria-hidden="true"
                              />
                              {subItem.name}
                            </Link>
                          );
                        }
                      }
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Botón del menú móvil */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-white hover:bg-sky-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
        {/* Menú para móviles */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex text-left justify-between items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      location.pathname === item.path
                        ? "border-transparent text-white hover:bg-sky-500 hover:border-gray-300 hover:text-white"
                        : "border-transparent text-white hover:bg-sky-500 hover:border-gray-300 hover:text-white"
                    }`}
                  >
                    <item.icon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.subItems && <ChevronDown className="ml-2 h-4 w-4" />}
                  </button>
                  {item.subItems && openSubmenu === item.name && (
                    <div className="pl-6 bg-sky-600">
                      {item.subItems.map((subItem) => {
                        if (subItem.name === "Cerrar sesión") {
                          return (
                            <div
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={logout}
                            >
                              <subItem.icon
                                className="inline-block w-4 h-4 mr-2"
                                aria-hidden="true"
                              />
                              {subItem.name}
                            </div>
                          );
                        } else {
                          const acceso = user.roles_permiso.find(
                            (x: any) => x.Pantalla === subItem.name
                          );
                          if (acceso) {
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block py-2 text-sm text-white hover:bg-sky-700 hover:text-white"
                              >
                                {subItem.name}
                              </Link>
                            );
                          }
                        }
                      })}
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
