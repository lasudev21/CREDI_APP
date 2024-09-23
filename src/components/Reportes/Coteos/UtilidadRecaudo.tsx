/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridApi } from "ag-grid-community";

interface RowData {
  cobrador: string;
  [key: string]: string | number;
}

interface ColumnDef {
  headerName: string;
  field: string;
  width?: number;
  cellStyle?: any;
  valueFormatter?: (params: any) => string;
  valueGetter?: (params: any) => number;
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
  const generateColumnDefs = (): ColumnDef[] => {
    const cols: ColumnDef[] = [
      {
        headerName: "COBRADOR",
        field: "cobrador",
        cellStyle: { backgroundColor: "rgb(3 105 161 / 62%)", color: "white" },
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
        cellStyle: { backgroundColor: "rgb(3 105 161 / 62%)", color: "white" },
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
    ];
    return cols;
  };

  const defaultColDef = {
    sortable: true,
    resizable: true,
  };

  const onGridReady = (params: { api: GridApi }) => {
    params.api.sizeColumnsToFit();
    params.api.setGridOption("rowData", rowData);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: height, width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={generateColumnDefs()}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
}
