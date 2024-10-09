import { useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { IUsuario, IUsuarios, UsuarioVacio } from "../../../types/IUsuario";
import { getUsuarios } from "../../../services/usuarioService";
import Setting from "./Setting";
import { useUserStore } from "../../../store/UserStore";
import Card from "../../../components/Common/Card";
import TableMaterialR from "../../../components/Common/TableMaterialR";
import { Plus } from "lucide-react";
import { IconButton } from "@mui/material";
import { useDashboardStore } from "../../../store/DashboardStore";
import Drawer from "../../../components/Common/Drawer";
import { ICliente } from "../../../types/ICliente";
import {
  getListaRoles,
  getListaRutas,
} from "../../../services/parametroService";
import { IItemsCBox } from "../../../types/IRuta";
import { Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { usuarios, setClientes, formData, setFormData, setRutas, setRoles } =
    useUserStore();
  const { showDrawer, toggleDrawer, validarPermiso, isMobile } =
    useDashboardStore();

  const AddUsuario = () => {
    setFormData(UsuarioVacio);
    toggleDrawer(true);
  };

  const icons: React.ReactNode[] = [
    <IconButton
      color="primary"
      onClick={AddUsuario}
      key="btn[0][0]"
      title="Agregar usuario"
    >
      <Plus />
    </IconButton>,
    <IconButton
      color="primary"
      onClick={() => Usuarios()}
      key="btn[0][1]"
      title="Refrescar"
    >
      <Refresh />
    </IconButton>,
  ];

  const handleRowClick = (row: IUsuario) => {
    setFormData(row);
  };

  const SeeUser = (cliente: IUsuario) => {
    toggleDrawer(true);
    setFormData(cliente);
  };

  const actionsUsuario = (action: number, usuario: IUsuario | ICliente) => {
    usuario = usuario as IUsuario;

    if (action === 1) SeeUser(usuario);
  };

  const columns = useMemo<MRT_ColumnDef<IUsuario>[]>(
    () => [
      {
        accessorKey: "nombres",
        header: "Nombres",
        enableHiding: false,
        enableColumnActions: false,
        enablePinning: true,
      },
      {
        accessorKey: "apellidos",
        header: "Apellidos",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "telefono1",
        size: 50,
        header: "Telefono",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "login",
        size: 50,
        header: "Login?",
        enableHiding: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue, staticRowIndex }) => (
          <div className="flex items-center">
            <input
              id={`Chechk-${renderedCellValue}-${staticRowIndex}`}
              type="checkbox"
              onChange={() => {}}
              checked={renderedCellValue ? true : false}
              className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500"
            />
          </div>
        ),
      },
      {
        accessorKey: "username",
        size: 100,
        header: "Nombre de usuario",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "ruta",
        size: 100,
        header: "Ruta",
        enableHiding: false,
        enableColumnActions: false,
      },
    ],
    []
  );

  const Usuarios = async () => {
    setIsloading(true);
    const response = await getUsuarios();
    const data: IUsuarios = response;
    setClientes(data);
    setIsloading(false);
  };

  const Rutas = async () => {
    const response = await getListaRutas();
    const data: IItemsCBox[] = response;
    setRutas(data);
  };

  const Roles = async () => {
    const response = await getListaRoles();
    const data: IItemsCBox[] = response;
    setRoles(data);
  };

  useEffect(() => {
    if (!validarPermiso("Usuarios")) {
      navigate("/permisos");
    } else {
      setFormData(UsuarioVacio);
      Rutas();
      Roles();
      Usuarios();
    }
  }, []);

  return (
    <>
      <Card
        icons={icons}
        title="Gestión de usuarios"
        texts={[]}
        content={
          <TableMaterialR
            columns={columns}
            data={usuarios ? usuarios.data : []}
            isLoading={isLoading}
            enableButtons={true}
            enablePagination={false}
            blockLeft={["mrt-row-expand", "mrt-row-select", "mrt-row-actions"]}
            actions={actionsUsuario}
            typeAction="usuario"
            clickEvent={handleRowClick}
          />
        }
      />
      {showDrawer && (
        <Drawer
          size={isMobile ? "w-full" : "w-2/4"}
          title="Agregar/Editar usuario"
          content={<Setting usuario={formData} />}
          accion={() => {}}
        />
      )}
    </>
  );
}
