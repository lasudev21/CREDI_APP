/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { NuevosYRenovados } from "../../../types/IReporte";

interface UtilityTableProps {
  rowData: NuevosYRenovados[];
  height: number;
}

export default function NuevosRenovaciones({
  rowData,
  height,
}: UtilityTableProps) {
  const [columnDefs] = useState([
    {
      headerName: "COBRADOR",
      field: "cobrador",
      pinned: "left",
    },
    {
      headerName: "CLIENTES CORTE 1",
      headerClass: "bg-stone-50 text-gray-700 font-bold",
      children: [
        {
          columnGroupShow: "open",
          field: "nuevos_corte1",
          headerName: "NUEVOS",
        },
        {
          columnGroupShow: "open",
          field: "renovados_corte1",
          headerName: "RENOVADOS",
        },
      ],
    },
    {
      headerName: "CLIENTES CORTE 2",
      headerClass: "bg-stone-50 text-gray-700 font-bold",
      children: [
        {
          columnGroupShow: "open",
          field: "nuevos_corte2",
          headerName: "NUEVOS",
        },
        {
          columnGroupShow: "open",
          field: "renovados_corte2",
          headerName: "RENOVADOS",
        },
      ],
    },
    {
      headerName: "CLIENTES CORTE 3",
      headerClass: "bg-stone-50 text-gray-700 font-bold",
      children: [
        {
          columnGroupShow: "open",
          field: "nuevos_corte3",
          headerName: "NUEVOS",
        },
        {
          columnGroupShow: "open",
          field: "renovados_corte3",
          headerName: "RENOVADOS",
        },
      ],
    },
    {
      headerName: "TOTAL NUEVOS",
      field: "total",
      valueGetter: (params: any) => {
        return (
          Number(params.data.nuevos_corte1) +
          Number(params.data.nuevos_corte2) +
          Number(params.data.nuevos_corte3)
        );
      },
    },
    {
      headerName: "TOTAL RENOVADOS",
      field: "total",
      valueGetter: (params: any) => {
        return (
          Number(params.data.renovados_corte1) +
          Number(params.data.renovados_corte2) +
          Number(params.data.renovados_corte3)
        );
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      headerClass: "bg-stone-50 text-gray-700 font-bold",
      minWidth: 120,
      editable: false,
      resizable: false,
      sorteable: false,
      cellStyle: (params: { value: number }) => {
        switch (true) {
          case params.value !== 0 && typeof params.value === "number":
            return { backgroundColor: "#f0f8ff", color: "default" };
        }
      },
    }),
    []
  );

  const onGridReady = (params: { api: GridApi }) => {
    params.api.sizeColumnsToFit();
    params.api.setGridOption("rowData", rowData);
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: height, width: "100%" }}
    >
      <AgGridReact
        rowHeight={30}
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
  );
}
