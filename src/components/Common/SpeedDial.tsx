import { Plus, X } from "lucide-react";
import React, { useState } from "react";

// Define las propiedades del componente SpeedDial
interface SpeedDialProps {
  buttons: JSX.Element[]; // Arreglo de elementos JSX que el componente recibirá
}

const SpeedDial: React.FC<SpeedDialProps> = ({ buttons }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className="fixed bottom-10 right-5 z-10">
      <div className="relative">
        <button
          className="bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition-all"
          onClick={toggleOpen}
        >
          {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>

        {/* Opciones del Speed Dial */}
        {open && (
          <div className="absolute bottom-16 right-0 flex flex-col space-y-2">
            {buttons.map((button, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-full shadow hover:bg-gray-100 transition border"
              >
                {button}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedDial;
