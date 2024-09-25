/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
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

interface DynamicTableProps<T> {
  rowData: RowData[];
  columnDefs: ColumnDef[];
  height?: number;
  width?: string | number;
}

const Corte = forwardRef(
  <T,>(
    { rowData, columnDefs, height = 700, width = "100%" }: DynamicTableProps<T>,
    ref: Ref<unknown> | undefined
  ) => {
    const gridRef = useRef<any>();

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

    useImperativeHandle(ref, () => ({
      getGridData: () => {
        const rowData: T[] = [];
        gridRef.current.api.forEachNode((node: any) => rowData.push(node.data));
        return rowData;
      },
    }));

    return (
      <div
        className="ag-theme-quartz"
        style={{ height, width }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={30}
          defaultColDef={defaultColDef}
          suppressMovableColumns={true}
        />
      </div>
    );
  }
);

export default Corte;
