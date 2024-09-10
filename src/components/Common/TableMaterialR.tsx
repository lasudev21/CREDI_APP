import { Box, IconButton } from "@mui/material";
import { DeleteIcon, EditIcon } from "lucide-react";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useState } from "react";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isLoading: boolean;
  enableButtons: boolean;
  enablePagination: boolean;
  blockLeft: string[];
}

const TableMaterialR: React.FC<Props> = ({
  columns,
  data,
  isLoading,
  enableButtons,
  enablePagination,
  blockLeft,
}) => {
  const [divHeight, setDivHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - (enablePagination ? 230 : 214);
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
    enableColumnPinning: false,
    enablePagination: enablePagination, //Para habilitar la paginación
    enableFacetedValues: true,
    enableRowSelection: false, //Para la seleccion de uno o varios registros
    columnFilterDisplayMode: "popover",
    enableBottomToolbar: false,
    enableStickyHeader: true,
    // paginationDisplayMode: "pages",
    muiTableContainerProps: { sx: { height: `${divHeight}px` } },
    muiTableBodyRowProps: {
      sx: {
        height: "25px",
        "&:hover": {
          backgroundColor: "#e0e0e0", // Color de fondo al pasar el mouse por encima
        },
      },
    },
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
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={() => console.info("Edit" + row.id)}>
          <EditIcon size={20} />
        </IconButton>
        <IconButton onClick={() => console.info("Delete")}>
          <DeleteIcon size={20} />
        </IconButton>
      </Box>
    ),
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
