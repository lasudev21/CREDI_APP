import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { ICreditoHistorialCliente } from "../../../types/ICredito";
import { useState } from "react";
import CardHistorialDetalle from "./CardHistorialDetalle";

interface HistorialProps {
  prestamo: ICreditoHistorialCliente;
}

const CardHistorial: React.FC<HistorialProps> = ({ prestamo }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      key={prestamo.Id}
      className="bg-white rounded-lg shadow-lg p-3 transition duration-300 ease-in-out hover:shadow-xl hover:bg-gray-50 cursor-pointer"
      onClick={() => toggleExpand()}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <DollarSign
            className="mr-1 text-sky-700 font-extrabold"
            size={14}
          />
          <span className="text-sm font-semibold">
            ${prestamo.ValorPrestamo.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm">
            {prestamo.ModDias} x ${prestamo.ModCuota.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>Préstamo</span>
        <span>Cuotas</span>
      </div>
      <div className="border-t my-2"></div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <CreditCard
            className="mr-1 text-sky-700 font-extrabold"
            size={14}
          />
          <span className="text-sm">
            ${(prestamo.ModCuota * Number(prestamo.ModDias)).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center">
          <Calendar
            className="mr-1 text-sky-700 font-extrabold"
            size={14}
          />
          <span className="text-sm">
            {new Date(prestamo.Finalizacion).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>Total</span>
        <span>Fecha fin</span>
      </div>
      <div className="flex flex-row-reverse text-center mt-2 ">
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {expanded && <CardHistorialDetalle detalle={prestamo.DetallesCredito} />}
    </div>
  );
};
export default CardHistorial;
