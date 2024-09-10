import React from "react";
import { useDashboardStore } from "../../store/DashboardStore";

interface DrawerProps {
  title: string;
  size: string;
  content: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ title, content, size }) => {
  const showDrawer = useDashboardStore((state) => state.showDrawer);
  const toggle = useDashboardStore((state) => state.toggleDrawer);

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity ${
          showDrawer ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full ${size} bg-white z-20 shadow-lg transform transition-transform overflow-y-auto ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex">
            <h2 className="text-lg font-semibold text-sky-800">{title}</h2>
            <button
              type="button"
              onClick={() => toggle(false)}
              data-drawer-hide="drawer-right-example"
              aria-controls="drawer-right-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="overflow-y-auto">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
