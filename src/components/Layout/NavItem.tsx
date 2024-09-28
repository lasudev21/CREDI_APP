import { useState } from "react";
import { Link } from "react-router-dom";
import { INavItem } from "../../types/INavItem";
import { ChevronDown } from "lucide-react";

export function NavItem({ item }: { item: INavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white  hover:text-white hover:bg-sky-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <item.icon
            className="w-5 h-5 mr-2"
            aria-hidden="true"
          />
          {item.label}
          <ChevronDown
            className={`ml-2 w-4 h-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.href}
                to={subItem.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <subItem.icon
                  className="inline-block w-4 h-4 mr-2"
                  aria-hidden="true"
                />
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white  hover:text-white hover:bg-sky-500"
    >
      <item.icon
        className="w-5 h-5 mr-2"
        aria-hidden="true"
      />
      {item.label}
    </Link>
  );
}
