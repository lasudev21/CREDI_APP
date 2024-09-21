/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountCircle } from "@mui/icons-material";
import { Box, Button, ListItemIcon, MenuItem } from "@mui/material";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useState } from "react";
import { ICliente } from "../../types/ICliente";
import { ListOrdered, UserPen } from "lucide-react";

interface ITableMaterialProps<T> {
  columns: any;
  data: T[];
  isLoading: boolean;
  enableButtons: boolean;
  enablePagination: boolean;
  blockLeft: string[];
  actions: (action: number, data: ICliente) => void;
  clickEvent: (row: T) => void;
}

const TableMaterialR = <T extends object>({
  columns,
  data,
  isLoading,
  enableButtons,
  enablePagination,
  blockLeft,
  actions,
  clickEvent,
}: ITableMaterialProps<T>) => {
  const [divHeight, setDivHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight =
        window.innerHeight - (enablePagination ? 249 : 231);
      setDivHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading,
    },
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    enableGrouping: false,
    enableColumnPinning: true,
    enablePagination: enablePagination, //Para habilitar la paginación
    enableFacetedValues: true,
    enableRowSelection: false, //Para la seleccion de uno o varios registros
    columnFilterDisplayMode: "popover",
    enableBottomToolbar: false,
    enableStickyHeader: true,
    // paginationDisplayMode: "pages",
    muiTableContainerProps: { sx: { height: `${divHeight}px` } },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        height: "25px",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      },
      onClick: () => clickEvent(row.original),
    }),
    initialState: {
      density: "compact",
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: blockLeft,
      },
      pagination: {
        pageIndex: 0,
        pageSize: 50, // Cantidad de registros por página
      },
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [50, 100, 500, 1000],
      shape: "rounded",
      variant: "outlined",
    },
    enableRowActions: enableButtons, //habilitar botones
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          const cliente = Object.assign({}, row.original) as ICliente;
          closeMenu();
          actions(1, cliente);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Ver cliente
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          const cliente = Object.assign({}, row.original) as ICliente;
          closeMenu();
          actions(2, cliente);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <UserPen />
        </ListItemIcon>
        Cambiar estado
      </MenuItem>,
      <MenuItem
        key={2}
        onClick={() => {
          const cliente = Object.assign({}, row.original) as ICliente;
          closeMenu();
          actions(3, cliente);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <ListOrdered />
        </ListItemIcon>
        Historial de creditos
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 2,
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <MRT_GlobalFilterTextField table={table} />
          {enablePagination && <MRT_TablePagination table={table} />}
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};
export default TableMaterialR;
