"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useRutaStore } from "../../store/RutaStore";
import { IItemsCBox } from "../../types/IRuta";
import { getCredito } from "../../services/parametroService";
import { useDashboardStore } from "../../store/DashboardStore";
import { ICreditoData } from "../../types/ICredito";
import { recalculate } from "../../utils/helper";

interface IModalRutasProps {
  rutas: IItemsCBox[];
}

const ModalRutas: React.FC<IModalRutasProps> = ({ rutas }) => {
  const { setIsModal, setData, setRutaId } = useRutaStore((state) => state);
  const { setLoader } = useDashboardStore((state) => state);
  const [selected, setSelected] = useState<number>(0);

  const handleConsultarCredito = async () => {
    setLoader(true);
    const response = await getCredito(selected);
    const data: ICreditoData = response;
    const recalculo = recalculate(data.data, true);
    setData({
      cartera: recalculo.cartera,
      data: recalculo.data,
      cobrador: data.cobrador,
    });
    setRutaId(selected);
    setIsModal(false);
    setLoader(false);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-1/1 p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-light">
              Seleccione la ruta que desea consultar...
            </h2>
            <button
              onClick={() => setIsModal(false)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <X
                width={20}
                onClick={() => setIsModal(false)}
              />
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="grid grid-cols-4 gap-2">
              {rutas.map((button, index) => (
                <button
                  key={index}
                  className={`text-sky-700 hover:text-white border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-sky-400 dark:text-sky-400 dark:hover:text-white dark:hover:bg-sky-500 dark:focus:ring-sky-900 ${
                    selected === button.value ? "bg-sky-600 " : ""
                  }`}
                  onClick={() => setSelected(button.value)}
                >
                  <span
                    className={`text-xs ${
                      selected === button.value ? "text-white" : ""
                    }`}
                  >
                    {button.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <button
              onClick={() => handleConsultarCredito()}
              className="middle none center w-full rounded-lg bg-cyan-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRutas;
