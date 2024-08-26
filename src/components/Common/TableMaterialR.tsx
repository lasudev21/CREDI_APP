import { Box, IconButton } from "@mui/material";
import { DeleteIcon, EditIcon } from "lucide-react";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  useMaterialReactTable,
} from "material-react-table";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isLoading: boolean;
  blockLeft: string[];
}

const TableMaterialR: React.FC<Props> = ({
  columns,
  data,
  isLoading,
  blockLeft,
}) => {
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
    enablePagination: true, //Para habilitar la paginación
    enableFacetedValues: true,
    enableRowSelection: false,
    columnFilterDisplayMode: "popover",
    enableBottomToolbar: false,
    paginationDisplayMode: "pages",
    muiTableContainerProps: { sx: { maxHeight: "485px" } },
    initialState: {
      density: "compact",
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: blockLeft,
      },
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [20, 50, 100, 1000],
      shape: "rounded",
      variant: "outlined",
    },
    enableRowActions: true,
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
          }}
        >
          <MRT_GlobalFilterTextField table={table} />
          <MRT_TablePagination table={table} />
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};
export default TableMaterialR;
