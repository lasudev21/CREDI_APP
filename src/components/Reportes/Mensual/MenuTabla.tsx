/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuItem } from "@mui/material";
import { Ellipsis, ListRestart, TicketPlus } from "lucide-react";
import { useState } from "react";

interface MenuTablaProps {
  data: any;
  actionAgregarVales: (id: number) => void;
  actionVerVales: (id: number) => void;
}

const MenuTabla: React.FC<MenuTablaProps> = ({
  data,
  actionAgregarVales,
  actionVerVales,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAgregarVales = () => {
    handleMenuClose();
    actionAgregarVales(data.node.rowIndex);
  };

  const handleVerVales = () => {
    handleMenuClose();
    actionVerVales(data.node.rowIndex);
  };

  return (
    <>
      <span
        className="w-10 h-10"
        onClick={handleMenuClick}
      >
        <Ellipsis />
      </span>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAgregarVales}>
          <ListRestart className="mr-2" /> Agregar Vales
        </MenuItem>
        <MenuItem onClick={handleVerVales}>
          <TicketPlus className="mr-2" /> Ver Vales
        </MenuItem>
      </Menu>
    </>
  );
};
export default MenuTabla;
