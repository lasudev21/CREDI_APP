import { useState } from "react";

import { ICreditoDetalle } from "../../../types/ICreditoDetalle";
import { ICreditoRenovacion } from "../../../types/ICreditoRenovacion";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import TableAGReact from "../../Common/TableAGReact";
import moment from "moment";
import { Download } from "lucide-react";
import { ICliente } from "../../../types/ICliente";
import { ExportarDetallesCredito } from "../../../utils/sjPDFExport";

interface IDetallesCreditoProps {
  creditos_detalles: ICreditoDetalle[];
  creditos_renovaciones: ICreditoRenovacion[];
  cliente: ICliente;
}

const DetallesCredito: React.FC<IDetallesCreditoProps> = ({
  creditos_detalles,
  creditos_renovaciones,
  cliente,
}) => {
  const handleImprimir = () => {
    ExportarDetallesCredito(creditos_detalles, creditos_renovaciones, cliente);
  };

  const [colDefsAbonos] = useState<ColDef[]>([
    { field: "abono", headerName: "Abono", width: 70 },
    {
      field: "fecha_abono",
      headerName: "Fecha",
      type: "date",
      valueFormatter: (params: ValueFormatterParams) => {
        return moment(params.value).format("YYYY-MM-DD");
      },
      width: 70,
    },
    { field: "user.nombres", headerName: "Usuario", width: 70 },
  ]);

  const [colDefsRenovaciones] = useState<ColDef[]>([
    { field: "observaciones", headerName: "Observación", width: 70 },
    {
      field: "fecha",
      headerName: "Fecha",
      type: "date",
      valueFormatter: (params: ValueFormatterParams) => {
        return moment(params.value).format("YYYY-MM-DD");
      },
      width: 70,
    },
    { field: "estado", headerName: "Estado", type: "boolean", width: 70 },
  ]);

  return (
    <>
      <div className="flex flex-row-reverse bg-[#E5E5E7] p-2 border-b-2 border-sky-600 ">
        <Download
          size={20}
          onClick={handleImprimir}
          className="hover:text-sky-600 ml-2 rounded transition-all"
        />
      </div>
      <div className="sm:px-4 md:px-4 p-4">
        <form className="space-y-6">
          <div className="grid grid-cols-12 gap-4 mb-2">
            <div className="col-span-6">
              <p className="text-xl text-sky-500 font-extralight italic dark:text-white mb-2">
                Abonos
              </p>
              <TableAGReact
                colDefs={colDefsAbonos}
                data={creditos_detalles}
                key={"DC[0][0]"}
                pagination={false}
                height={350}
                actionPagining={() => {}}
                totalRecords={creditos_detalles.length}
                autoSize={true}
              />
            </div>
            <div className="col-span-6">
              <p className="text-xl text-sky-500 font-extralight italic dark:text-white mb-2">
                Renovaciones
              </p>
              <TableAGReact
                colDefs={colDefsRenovaciones}
                data={creditos_renovaciones}
                key={"DC[0][1]"}
                pagination={false}
                height={350}
                actionPagining={() => {}}
                totalRecords={creditos_renovaciones.length}
                autoSize={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mb-2">
            <div className="col-span-12">
              <div className="relative z-0">
                <textarea
                  id="observaciones"
                  name="observaciones"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peerl"
                  rows={3}
                />
                <label
                  htmlFor="observaciones"
                  className={`absolute text-xl text-sky-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
                >
                  Observaciones
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default DetallesCredito;
