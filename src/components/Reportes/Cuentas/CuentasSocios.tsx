/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import { useCuentaStore } from "../../../store/CuentaStore";
import { useMemo, useRef, useState } from "react";
import { ColDef, GridApi } from "ag-grid-community";
import { ICuentas } from "../../../types/IReporte";
import BarChart from "./BarChart";

interface ICuentasSociosProps {
  height: number;
}

const CuentasSocios: React.FC<ICuentasSociosProps> = ({ height }) => {
  const gridRef = useRef<any>();
  const { list1 } = useCuentaStore();
  const data = list1.map((item: ICuentas) => {
    return {
      label: item.mes,
      value1: item.entradas,
      value2: item.salidas,
    };
  });

  const onGridReady = (params: { api: GridApi }) => {
    params.api.sizeColumnsToFit();
    params.api.setGridOption("rowData", list1);
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      minWidth: 40,
      width: 150,
      filter: false,
      sortable: false,
      resizable: false,
      lockPosition: "left",
      headerClass: "bg-stone-50 text-gray-700 font-bold",
    };
  }, []);

  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "id",
      width: 40,
      pinned: "left",
      //   cellRenderer: (params: any) => (
      //     <MenuTabla
      //       data={params}
      //       actionAgregarVales={handleAgregarVales}
      //       actionVerVales={handleVerVales}
      //     />
      //   ),
    },
    {
      headerName: "Mes",
      field: "mes",
      pinned: "left",
    },
    {
      headerName: "Entradas",
      field: "entradas",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Salidas",
      field: "salidas",
      editable: true,
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "TOTAL",
      field: "",
      valueGetter: (params: any) => {
        return Number(params.data.entradas - params.data.salidas);
      },
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
  ]);

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      <div className="col-span-12 lg:col-span-8">
        <div
          className="ag-theme-material"
          style={{ height }}
        >
          <AgGridReact<ICuentas>
            ref={gridRef}
            rowData={list1}
            columnDefs={colDefs}
            rowHeight={30}
            defaultColDef={defaultColDef}
            suppressMovableColumns={true}
            onGridReady={onGridReady}
            rowDragManaged={true}
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 flex items-center">
        <BarChart
          data={data}
          titulos={["Entradas", "Salidas"]}
        />
      </div>
    </div>
  );
};
export default CuentasSocios;
