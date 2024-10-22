import { ICreditoHistorialCliente } from "../../../types/ICredito";
import CardHistorial from "./CardHistorial";

interface HistorialProps {
  data: ICreditoHistorialCliente[];
}

const Historial: React.FC<HistorialProps> = ({ data }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((prestamo: ICreditoHistorialCliente) => (
          <CardHistorial prestamo={prestamo} />
        ))}
      </div>
    </div>
  );
};
export default Historial;
