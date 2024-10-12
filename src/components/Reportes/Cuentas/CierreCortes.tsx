/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import { useCuentaStore } from "../../../store/CuentaStore";
import { useMemo, useRef, useState } from "react";
import { ColDef, GridApi } from "ag-grid-community";
import { ICierres } from "../../../types/IReporte";
import BarChart from "./BarChart";

interface ICierreCortesProps {
  height: number;
}

const CierreCortes: React.FC<ICierreCortesProps> = ({ height }) => {
  const gridRef = useRef<any>();
  const { list } = useCuentaStore();
  const data = list.map((item: ICierres) => {
    return {
      label: item.mes,
      value1: item.utilidad,
      value2: item.utilidad - item.gastos,
    };
  });

  const onGridReady = (params: { api: GridApi }) => {
    params.api.sizeColumnsToFit();
    params.api.setGridOption("rowData", list);
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
      width: 50,
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
      headerName: "Cobros",
      field: "cobros",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Prestamos",
      field: "prestamos",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Utilidad bruta",
      field: "utilidad",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Gastos",
      field: "gastos",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Utilidad neta",
      field: "",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      valueGetter: (params: any) => {
        return Number(params.data.utilidad - params.data.gastos);
      },
    },
  ]);

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      <div className="col-span-12 lg:col-span-8">
        <div
          className="ag-theme-material"
          style={{ height }}
        >
          <AgGridReact<ICierres>
            ref={gridRef}
            rowData={list}
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
          titulos={["Utiidad Bruta", "Utilidad neta"]}
        />
      </div>
    </div>
  );
};
export default CierreCortes;
