import { useEffect, useState } from "react";
// import { MRT_ColumnDef } from "material-react-table";
import {
  IUsuario,
  IUsuarios,
  RoleEnum,
  UsuarioVacio,
} from "../../../types/IUsuario";
import { getUsuarios } from "../../../services/usuarioService";
import Setting from "./Setting";
import { useUserStore } from "../../../store/UserStore";
import { Plus, RefreshCw, User } from "lucide-react";
import { useDashboardStore } from "../../../store/DashboardStore";
import Drawer from "../../../components/Common/Drawer";
import {
  getListaRoles,
  getListaRutas,
} from "../../../services/parametroService";
import { IItemsCBox } from "../../../types/IRuta";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Common/Card";
import { IconButton } from "@mui/material";

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [height, setHeight] = useState<number>(0);
  const navigate = useNavigate();
  const { usuarios, setClientes, formData, setFormData, setRutas, setRoles } =
    useUserStore();
  const { showDrawer, toggleDrawer, validarPermiso, isMobile, setLoader } =
    useDashboardStore();

  const filteredUsers = usuarios.filter((user) =>
    user.nombres.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <RefreshCw />
    </IconButton>,
  ];

  const SeeUser = (cliente: IUsuario) => {
    toggleDrawer(true);
    setFormData(cliente);
  };

  const Usuarios = async () => {
    setLoader(true);
    const response = await getUsuarios();
    const data: IUsuarios = response;
    setClientes(data);
    setLoader(false);
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

  const UserCard = ({ user }: { user: IUsuario }) => (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
      onClick={() => SeeUser(user)}
    >
      <h2 className="flex text-xl font-semibold mb-2">
        <User size={25} />
        {user.nombres} {user.apellidos}
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="flex">
            Tel: <span className="text-sky-500 ml-1">{user.telefono1}</span>
          </span>
          <span className="flex">
            Login:{" "}
            <div className="flex items-center ml-1">
              <input
                disabled
                checked={user.login}
                id="disabled-checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </span>
        </div>
        <div className="border-t border-gray-200"></div>
        {user.login ? (
          <div className="flex justify-between">
            <span className="flex">
              Usuario:{" "}
              <span className="text-sky-500 ml-1">
                {user.username || "N/A"}
              </span>
            </span>
            <span>
              Rol:{" "}
              <span className="text-sky-500">
                {user.rol ? RoleEnum[user.rol] : "N/A"}
              </span>
            </span>
          </div>
        ) : (
          <div className="flex justify-between">
            <span>
              Ruta:{" "}
              <span className="text-sky-500">
                {user.ruta || "No especificada"}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (!validarPermiso("Usuarios")) {
      navigate("/permisos");
    } else {
      setFormData(UsuarioVacio);
      Rutas();
      Roles();
      Usuarios();
    }

    const handleResize = () => {
      const calculatedHeight = window.innerHeight - (isMobile ? 200 : 175);
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Card
        icons={icons}
        texts={[
          <label
            key={"Label[0][0]"}
            className="mr-3"
          >
            Total
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              {usuarios.length ?? 0}
            </span>
          </label>,
        ]}
        title="Administración de usuarios"
        content={
          <div
            className="mx-auto flex flex-col overflow-auto p-2"
            style={{ height }}
          >
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="p-3 mb-4 border border-gray-200 rounded"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto pr-3 pb-4">
              {filteredUsers.map((user: IUsuario) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))}
            </div>
          </div>
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
