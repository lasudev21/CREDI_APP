/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from "ag-grid-community";
import { useMemo, useState } from "react";

interface RowData {
  cobrador: string;
  [key: string]: string | number;
}

interface UtilityTableProps {
  rowData: RowData[];
  dateColumns: string[];
  height: number;
}

export default function UtilidadRecaudo({
  rowData,
  height,
}: UtilityTableProps) {
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: false,
      resizable: false,
      minWidth: 120,
      headerClass: "bg-stone-50 text-gray-700 font-bold",
      editable: false,
      sorteable: false,
      cellStyle: (params: { value: number | string }) => {
        switch (true) {
          case params.value !== 0 && typeof params.value === "number":
            return { backgroundColor: "#f0f8ff", color: "default" };
        }
      },
    }),
    []
  );

  const [cols] = useState<ColDef[]>([
    {
      headerName: "COBRADOR",
      field: "cobrador",
      pinned: "left",
    },
    {
      headerName: "Corte 1",
      field: "corte1",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Corte 2",
      field: "corte2",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "Corte 3",
      field: "corte3",
      valueFormatter: (params: any) =>
        params.value.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    {
      headerName: "TOTAL MES",
      field: "total",
      pinned: "right",
      valueGetter: (params: any) => {
        return (
          Number(params.data.corte1) +
          Number(params.data.corte2) +
          Number(params.data.corte3)
        );
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
        rowData={rowData}
        rowHeight={30}
        columnDefs={cols}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
}
