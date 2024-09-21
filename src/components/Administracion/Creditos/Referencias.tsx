import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Ellipsis, PlusCircle } from "lucide-react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  IClienteReferencia,
  ReferenciasHandle,
} from "../../../types/IClienteReferencia";

const validateRequired = (value: string) => !!value.length;

interface ITableMaterialProps {
  data: IClienteReferencia[];
  tipo: string;
  idCliente: number;
}

const Referencias = forwardRef<ReferenciasHandle, ITableMaterialProps>(
  (props, ref) => {
    const [_data, _setData] = useState<IClienteReferencia[]>(props.data);
    const [validationErrors, setValidationErrors] = useState<
      Record<string, string | undefined>
    >({});
    const [editedUsers, setEditedUsers] = useState<
      Record<string, IClienteReferencia>
    >({});

    function validateUser(user: IClienteReferencia) {
      return {
        nombre: !validateRequired(user.nombre) ? "El nombre es requerido" : "",
        direccion: !validateRequired(user.direccion)
          ? "La direccion Requerida"
          : "",
        barrio: !validateRequired(user.barrio) ? "El barrio es requerido" : "",
        telefono: !validateRequired(user.telefono)
          ? "El teléfono es requerido"
          : "",
        parentesco: !validateRequired(user.parentesco)
          ? "El parentesco es requerido"
          : "",
      };
    }

    useImperativeHandle(ref, () => ({
      getData: () => _data,
      setData: () => _setData([]),
    }));

    const handleCreateUser: MRT_TableOptions<IClienteReferencia>["onCreatingRowSave"] =
      async ({ values, table }) => {
        const newRow = {
          ...values,
          id: 0,
          tipo_referencia: props.tipo,
          cliente_id: props.idCliente,
        };

        const newValidationErrors = validateUser(newRow);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        _setData((prevCreditos) => [...prevCreditos, newRow]);
        setValidationErrors({});
        table.setCreatingRow(null);
      };

    const handleEditUser: MRT_TableOptions<IClienteReferencia>["onEditingRowSave"] =
      (newEditingRow) => {
        console.log(newEditingRow);
      };

    const columns: MRT_ColumnDef<IClienteReferencia>[] = [
      {
        accessorKey: "nombre",
        header: "Nombre",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          disabled:
            !table.getState().creatingRow && row.original.id !== undefined,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Requerido"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "direccion",
        header: "Dirección",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          disabled:
            !table.getState().creatingRow && row.original.id !== undefined,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Requerido"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "barrio",
        header: "Barrio",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Requerido"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "telefono",
        header: "Teléfono",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "number",
          required: true,
          disabled:
            !table.getState().creatingRow && row.original.id !== undefined,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Requerido"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: "parentesco",
        header: "Parentesco",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          disabled:
            !table.getState().creatingRow && row.original.id !== undefined,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Requerido"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
          },
        }),
      },
    ];

    const table = useMaterialReactTable({
      columns,
      data: _data,
      getRowId: (row) => row.id.toString(),
      enableColumnFilterModes: false,
      enableColumnOrdering: false,
      enableGrouping: false,
      enableColumnPinning: true,
      enablePagination: false,
      enableFacetedValues: false,
      enableRowSelection: false, //Para la seleccion de uno o varios registros
      columnFilterDisplayMode: "popover",
      enableBottomToolbar: false,
      enableStickyHeader: true,
      enableEditing: true,
      enableRowNumbers: true,
      enableToolbarInternalActions: false,
      muiTableContainerProps: { sx: { height: 300 } },
      muiTableBodyRowProps: () => ({
        sx: {
          height: "25px",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
      }),
      initialState: {
        density: "compact",
        showColumnFilters: false,
        showGlobalFilter: false,
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
      createDisplayMode: "row",
      editDisplayMode: "cell",
      enableRowActions: true,
      positionActionsColumn: "last",
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateUser,

      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleEditUser,

      renderRowActions: () => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Eliminar">
            <IconButton color="error">
              <Ellipsis />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          <PlusCircle className="mr-2" />
          Referencia {props.tipo}
        </Button>
      ),
    });

    return <MaterialReactTable table={table} />;
  }
);
export default Referencias;
