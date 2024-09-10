/* eslint-disable @typescript-eslint/no-unused-vars */
import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import {
  CellKeyDownEvent,
  ColDef,
  FullWidthCellKeyDownEvent,
  GetContextMenuItemsParams,
  GridApi,
  MenuItemDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";
import { TablePagination } from "@mui/material";

interface ITableAGReact<T> {
  data: T[];
  colDefs: ColDef[];
  pagination: boolean;
  height: number;
  totalRecords: number;
  actionPagining: (_page: number) => void;
}

const TableAGReact = <T,>({
  data,
  colDefs,
  pagination,
  height,
  totalRecords,
  actionPagining,
}: ITableAGReact<T>) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [page, setPage] = useState(1);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 150,
      filter: false,
      editable: false,
      lockPosition: "left",
    };
  }, []);

  // const getContextMenuItems = useCallback(
  //   (params: GetContextMenuItemsParams) => {
  //     const result = [
  //       {
  //         name: "Opción 1",
  //         action: () => {
  //           console.log(
  //             "Opción 1 seleccionada para la fila:",
  //             params.node?.data
  //           );
  //           // Aquí puedes agregar la lógica para la Opción 1
  //         },
  //       },
  //       {
  //         name: "Opción 2",
  //         action: () => {
  //           console.log(
  //             "Opción 2 seleccionada para la fila:",
  //             params.node?.data
  //           );
  //           // Aquí puedes agregar la lógica para la Opción 2
  //         },
  //       },
  //     ];
  //     return result;
  //   },
  //   []
  // );

  const onGridReady = (params: { api: GridApi }) => {
    setGridApi(params.api);
    console.log(gridApi);
    // console.log(params.api.paginationGetRowCount)
    // params.api.paginationSetRowCount(totalRecords, true);
  };

  const onCellKeyDown = useCallback((event: CellKeyDownEvent) => {
    if (
      (event.event.key === "ArrowDown" || event.event.key === "ArrowUp") &&
      event.column.getColId() === "cuota"
    ) {
      event.event.preventDefault();
      const currentRowIndex = event.rowIndex;
      const totalRows = event.api.getDisplayedRowCount();
      let nextRowIndex;

      if (event.event.key === "ArrowDown") {
        nextRowIndex = (currentRowIndex + 1) % totalRows;
      } else {
        nextRowIndex = (currentRowIndex - 1 + totalRows) % totalRows;
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
    console.log(newPage);
    setPage(newPage == 0 ? 1 : newPage);
    actionPagining(newPage == 0 ? 1 : newPage);
  };

  const handleChangeRowsPerPage = (
    _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div>
      <div
        className="ag-theme-balham"
        style={{ height }}
      >
        <AgGridReact<T>
          rowHeight={25}
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          rowDragManaged={true}
          onCellKeyDown={onCellKeyDown}
          // getContextMenuItems={getContextMenuItems}
          stopEditingWhenCellsLoseFocus={true}
          onGridReady={onGridReady}
          // onCellValueChanged={(event) =>
          //   console.log(`New Cell Value: ${event.value}`)
          // }
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
};
export default TableAGReact;
