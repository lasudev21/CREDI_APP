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
import { ColDef } from "ag-grid-community";

interface RowData {
  [key: string]: string | number;
}

interface DynamicTableProps {
  rowData: RowData[];
  columnDefs: ColDef[];
  height?: number;
  width?: string | number;
}

const Corte = forwardRef(
  <T,>(
    { rowData, columnDefs, height = 700, width = "100%" }: DynamicTableProps,
    ref: Ref<unknown> | undefined
  ) => {
    const gridRef = useRef<any>();

    const defaultColDef = useMemo(
      () => ({
        flex: 1,
        minWidth: 120,
        headerClass: "bg-stone-50 text-gray-700 font-bold",
        editable: false,
        resizable: false,
        sorteable: false,
        cellStyle: (params: { value: number | string }) => {
          switch (true) {
            case params.value !== 0 && typeof params.value  === "number":
              return { backgroundColor: "#f0f8ff", color: "default" };
          }
        },
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
        className="ag-theme-material"
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
