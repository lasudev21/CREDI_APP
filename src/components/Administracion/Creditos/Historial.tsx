/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ICreditoHistorialCliente } from "../../../types/ICredito";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import TableAGReact from "../../Common/TableAGReact";
import { DateFormat, NumberFormat } from "../../../utils/helper";

interface HistorialProps {
  data: ICreditoHistorialCliente[];
}

const Historial: React.FC<HistorialProps> = ({ data }) => {
  const gridRef = useRef<any>(null);
  const [height, setHeight] = useState<number>(0);

  const [colDefs] = useState<ColDef[]>([
    {
      field: "ValorPrestamo",
      headerName: "Prestamo",
      cellRenderer: (props: ValueFormatterParams) => {
        return NumberFormat(props.data.ValorPrestamo);
      },
    },
    {
      field: "ModCuota",
      headerName: "Cota",
      cellRenderer: (props: ValueFormatterParams) => {
        return NumberFormat(props.data.ModCuota);
      },
    },
    {
      field: "ModDias",
      headerName: "Días",
    },
    {
      field: "",
      headerName: "Total a pagar",
      cellRenderer: (props: ValueFormatterParams) => {
        return NumberFormat(props.data.ModCuota * props.data.ModDias);
      },
    },
    {
      field: "Ruta",
      headerName: "Ruta",
    },
    {
      field: "Activo",
      headerName: "Estado",
    },
    {
      field: "Finalizacion",
      headerName: "Finalización",
      valueFormatter: DateFormat,
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 600;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-4">
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
    </div>
  );
};
export default Historial;
