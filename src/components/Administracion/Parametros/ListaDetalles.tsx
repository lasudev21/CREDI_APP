/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { IParametroDetalle } from "../../../types/IParametro";
import TableAGReact from "../../Common/TableAGReact";
import { ColDef } from "ag-grid-community";
import ActionIcon from "../../Common/ActionIcon";
import { Plus, Save } from "lucide-react";
import { useDashboardStore } from "../../../store/DashboardStore";
import Modal from "../../Common/Modal";
import AgregarParametro from "./AgregarParametro";
import { putParametros } from "../../../services/parametroService";
import { IResponse } from "../../../types/IResponse";
import { TypeToastEnum } from "../../../types/IToast";
import { useParametroStore } from "../../../store/ParametroStore";

interface ListaDetallesProps {
  data: IParametroDetalle[];
  editable: boolean;
  parametroId: number;
  Parametros: () => void;
}

const ListaDetalles: React.FC<ListaDetallesProps> = ({
  data,
  editable,
  parametroId,
  Parametros,
}) => {
  const gridRef = useRef<any>(null);
  const [height, setHeight] = useState<number>(0);
  const { setOpenModal, openModal, setLoader, setErrorsToast } =
    useDashboardStore();
  const { setSelectedIndex } = useParametroStore();

  const [colDefs] = useState<ColDef[]>([
    {
      field: "id_interno",
      headerName: "Id",
      width: 50,
    },
    {
      field: "valor",
      headerName: "Valor",
      editable: true,
      width: 200,
    },
    {
      field: "estado",
      headerName: "Estado",
      editable: true,
      width: 100,
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 170;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSave = async () => {
    setLoader(true);
    const data = gridRef.current.getGridData();
    const response: IResponse | null = await putParametros({ cambios: data });
    
    if (response) {
      if (response.status === 200) {
        setErrorsToast([
          {
            message: "Detalles actualizados con éxito",
            type: TypeToastEnum.Susccess,
          },
        ]);
        setSelectedIndex(0);
        Parametros();
      }
    }
    setLoader(false);
  };

  return (
    <>
      {openModal && (
        <Modal
          title="Agregar parámetro"
          content={
            <AgregarParametro
              data={data}
              parametroId={parametroId}
              Parametros={Parametros}
            />
          }
        />
      )}

      {parametroId !== 0 ? (
        editable ? (
          <>
            <div className="flex justify-between items-center border-b p-2 text-sky-700">
              <div className="text-pretty font-bold">
                Detalles del parámetro
              </div>
              <div className="flex space-x-4">
                <ActionIcon
                  IconComponent={Plus}
                  action={() => setOpenModal(true)}
                  key="btn[0][0]"
                />
                <ActionIcon
                  IconComponent={Save}
                  action={handleSave}
                  key="btn[0][1]"
                />
              </div>
            </div>
            <TableAGReact
              ref={gridRef}
              colDefs={colDefs}
              data={data}
              key={"TAGR[1][0]"}
              pagination={false}
              height={height}
              totalRecords={data.length}
              actionPagining={() => {}}
              autoSize={true}
            />
          </>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {data.map((item: IParametroDetalle) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-sky-900 dark:text-sky-300">
                        {item.id_interno}
                      </span>
                    </td>
                    <td
                      align="right"
                      className="px-6 py-4"
                    >
                      {item.valor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : null}
    </>
  );
};
export default ListaDetalles;
