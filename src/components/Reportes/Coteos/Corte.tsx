"use client";

import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface RowData {
  [key: string]: string | number;
}

interface ColumnDef {
  headerName: string;
  field: string;
  children?: ColumnDef[];
  pinned?: "left" | "right";
  cellStyle?: React.CSSProperties;
}

interface DynamicTableProps {
  rowData: RowData[];
  columnDefs: ColumnDef[];
  height?: number;
  width?: string | number;
}

export default function Corte({
  rowData,
  columnDefs,
  height = 700,
  width = "100%",
}: DynamicTableProps) {
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      editable: false,
      resizable: false,
      sorteable: false,
    }),
    []
  );

  // useImperativeHandle(ref, () => ({
  //   getGridData: () => {
  //     const rowData: T[] = [];
  //     gridRef.current.api.forEachNode((node: any) => rowData.push(node.data));
  //     return rowData;
  //   },
  // }));

  return (
    <div
      className="ag-theme-quartz"
      style={{ height, width }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowHeight={30}
        defaultColDef={defaultColDef}
        suppressMovableColumns={true}
      />
    </div>
  );
}
