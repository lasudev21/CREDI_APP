/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CellKeyDownEvent, ColDef, GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TablePagination } from "@mui/material";

interface ITableAGReact<T> {
  data: T[];
  colDefs: ColDef[];
  pagination: boolean;
  height: number;
  totalRecords: number;
  actionPagining: (_page: number) => void;
  autoSize: boolean;
}

const TableAGReact = forwardRef(
  <T,>(
    {
      data,
      colDefs,
      pagination,
      height,
      totalRecords,
      actionPagining,
      autoSize = false,
    }: ITableAGReact<T>,
    ref: Ref<unknown> | undefined
  ) => {
    const gridRef = useRef<any>();

    const [page, setPage] = useState(1);
    const defaultColDef = useMemo<ColDef>(() => {
      return {
        width: 150,
        filter: false,
        editable: false,
        resizable: false,
        sortable: false,
        lockPosition: "left",
        headerClass: "bg-stone-50 text-gray-700 font-bold",
      };
    }, []);

    const onGridReady = (params: { api: GridApi }) => {
      if (autoSize) params.api.sizeColumnsToFit();
      params.api.setGridOption("rowData", data);
    };

    const onCellKeyDown = useCallback((event: CellKeyDownEvent) => {
      const eventKey = event.event?.key;
      if (
        (eventKey === "ArrowDown" || eventKey === "ArrowUp") &&
        event.column.getColId() === "cuota"
      ) {
        event.event?.preventDefault();
        const currentRowIndex = event.rowIndex;
        const totalRows = event.api.getDisplayedRowCount();
        let nextRowIndex;

        if (eventKey === "ArrowDown") {
          nextRowIndex = (Number(currentRowIndex) + 1) % totalRows;
        } else {
          nextRowIndex = (Number(currentRowIndex) - 1 + totalRows) % totalRows;
        }

        event.api.setFocusedCell(nextRowIndex, "cuota");
        event.api.startEditingCell({
          rowIndex: nextRowIndex,
          colKey: "cuota",
        });
      }
    }, []);

    const handleChangePage = (
      _event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage == 0 ? 1 : newPage);
      actionPagining(newPage == 0 ? 1 : newPage);
    };

    const handleChangeRowsPerPage = (
      _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      // setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };

    const getRowStyle = (params: any) => {
      if (params.data.reversar_cuota) {
        return { backgroundColor: "#ffefe0" }; // Estilo para la fila cuando `reversar_cuota` es true
      }
      return null;
    };

    useImperativeHandle(ref, () => ({
      getGridData: () => {
        const rowData: T[] = [];
        gridRef.current.api.forEachNode((node: any) => rowData.push(node.data));
        return rowData;
      },
      setCellValue: (rowIndex: number, field: string, newValue: any) => {
        const rowNode = gridRef.current!.api.getDisplayedRowAtIndex(rowIndex);
        if (rowNode) {
          rowNode.setDataValue(field, newValue);
        }
      },
    }));

    return (
      <div>
        <div
          className="ag-theme-material"
          style={{ height }}
        >
          <AgGridReact<T>
            ref={gridRef}
            rowHeight={25}
            rowData={data}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            rowDragManaged={true}
            onCellKeyDown={onCellKeyDown}
            stopEditingWhenCellsLoseFocus={true}
            onGridReady={onGridReady}
            getRowStyle={getRowStyle}
          />
        </div>
        <div className="t">
          {pagination ? (
            <div className="pagination-info">
              <TablePagination
                component="div"
                count={totalRecords}
                rowsPerPageOptions={[1000]}
                showFirstButton
                showLastButton
                onPageChange={handleChangePage}
                rowsPerPage={1000}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);

export default TableAGReact;
