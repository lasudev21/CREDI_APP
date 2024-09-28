/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuItem } from "@mui/material";
import {
  BookX,
  Ellipsis,
  FilePenLine,
  ListRestart,
  ListX,
  NotebookTabs,
  RefreshCwOff,
  Undo2,
} from "lucide-react";
import { useState } from "react";
const user = JSON.parse(localStorage.getItem("user") || "{}");

interface MenuTablaProps {
  data: any;
  actionRenInmediata: (id: number) => void;
  actionRenEditable: (id: number) => void;
  actionEliminarCredito: (id: number) => void;
  actionCancelarRen: (id: number) => void;
  actionDetallesCredito: (tipo: string, id: number) => void;
  actionCancelarEliminacion: (id: number) => void;
  actionReversarCuota: (id: number) => void;
}

const MenuTabla: React.FC<MenuTablaProps> = ({
  data,
  actionRenInmediata,
  actionRenEditable,
  actionCancelarRen,
  actionEliminarCredito,
  actionDetallesCredito,
  actionCancelarEliminacion,
  actionReversarCuota,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRenovacionInmediata = () => {
    handleMenuClose();
    actionRenInmediata(data.id);
  };

  const handleRenovacionEditable = () => {
    handleMenuClose();
    actionRenEditable(data.id);
  };

  const handleEliminarCredito = () => {
    handleMenuClose();
    actionEliminarCredito(data.id);
  };

  const handleDetallesCredito = () => {
    handleMenuClose();
    actionDetallesCredito("seeDetallesCredito", data.id);
  };

  const handleCancelarRenovacion = () => {
    handleMenuClose();
    actionCancelarRen(data.id);
  };

  const handleCancelarEliminacion = () => {
    handleMenuClose();
    actionCancelarEliminacion(data.id);
  };

  const handleReversarCuota = () => {
    handleMenuClose();
    actionReversarCuota(data.id);
  };

  return (
    <>
      <span
        className="w-10 h-10"
        onClick={handleMenuClick}
      >
        <Ellipsis />
      </span>
      {data.id > 0 ? (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleRenovacionInmediata}>
            <ListRestart className="mr-2" /> Renovación inmediata
          </MenuItem>
          <MenuItem onClick={handleRenovacionEditable}>
            <FilePenLine className="mr-2" /> Renovación editable
          </MenuItem>
          <MenuItem onClick={handleCancelarRenovacion}>
            <RefreshCwOff className="mr-2" /> Cancelar renovación
          </MenuItem>
          <MenuItem onClick={handleDetallesCredito}>
            <NotebookTabs className="mr-2" /> Detalles del crédito
          </MenuItem>
          {user.Rol === 1 && (
            <MenuItem onClick={handleEliminarCredito}>
              <ListX className="mr-2" /> Eliminar crédito
            </MenuItem>
          )}
          {user.Rol === 1 && data.delete && (
            <MenuItem onClick={handleCancelarEliminacion}>
              <BookX className="mr-2" /> Cancelar eliminación de crédito
            </MenuItem>
          )}
          {data.valor_ultimo_pago > 0 && (
            <MenuItem onClick={handleReversarCuota}>
              <Undo2 className="mr-2" /> Reversar última cuota
            </MenuItem>
          )}
        </Menu>
      ) : null}
    </>
  );
};
export default MenuTabla;
