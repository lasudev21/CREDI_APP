/* eslint-disable @typescript-eslint/no-explicit-any */
// ChildMenu.tsx
import React from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
// import { ICliente } from "../../types/ICliente";
import { AccountCircle, PersonSearch } from "@mui/icons-material";
import { ListOrdered, UserPen } from "lucide-react";
import { ICliente } from "../../types/ICliente";
import { IUsuario } from "../../types/IUsuario";

interface ChildMenuProps {
  menuType: string;
  row: any;
  closeMenu: () => void;
  actions: (action: number, data: ICliente | IUsuario) => void;
}

const ChildMenu: React.FC<ChildMenuProps> = ({
  menuType,
  row,
  closeMenu,
  actions,
}) => {
  return (
    <>
      {menuType === "cliente" ? (
        <>
          <MenuItem
            key={10000000000}
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
          </MenuItem>
          <MenuItem
            key={10000000001}
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
          </MenuItem>
          <MenuItem
            key={10000000002}
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
          </MenuItem>
        </>
      ) : menuType === "usuario" ? (
        <>
          <MenuItem
            key={10000000003}
            onClick={() => {
              const usuario = Object.assign({}, row.original) as IUsuario;
              closeMenu();
              actions(1, usuario);
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <PersonSearch />
            </ListItemIcon>
            Ver Usuario
          </MenuItem>
        </>
      ) : null}
    </>
  );
};

export default ChildMenu;
