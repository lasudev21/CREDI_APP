import { useState } from "react";
import { ICredito } from "../../../types/ICredito";
import moment from "moment";
import { Download } from "lucide-react";
import { Button } from "@mui/material";
import { exportarRuta } from "../../../utils/pdfMakeExport";

interface IExportarRutaProps {
  data: ICredito[];
}

const ExportarRuta: React.FC<IExportarRutaProps> = ({ data }) => {
  const [day, setDay] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const handleDescargarRuta = () => {
    exportarRuta(data, day);
  };

  return (
    <div className="sm:px-4 md:px-4 p-4">
      <div className="grid grid-cols-12 gap-4 mb-2">
        <div className="col-span-7">
          <span className="flex text-center">
            La fecha del exporte es automática, si desea cambiarla por favor
            seleccione
          </span>
        </div>
        <div className="col-span-5">
          <div className="relative z-0">
            <input
              name="fechaExporte"
              id="fechaExporte"
              value={day}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              onChange={(e) => setDay(e.target.value)}
              type="date"
            />
            <label
              htmlFor="fechaExporte"
              className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
            >
              Fecha
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row-reverse pt-4">
        <Button
          variant="contained"
          onClick={handleDescargarRuta}
          startIcon={<Download />}
        >
          Descargar
        </Button>
      </div>
    </div>
  );
};
export default ExportarRuta;