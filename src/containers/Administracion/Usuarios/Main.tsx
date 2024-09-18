import { useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { IUsuario, IUsuarios, UsuarioVacio } from "../../../types/IUsuario";
import { getUsuarios } from "../../../services/usuarioService";
import Setting from "./Setting";
import { useUserStore } from "../../../store/UserStore";
import Card from "../../../components/Common/Card";
import TableMaterialR from "../../../components/Common/TableMaterialR";
import { Plus, Save } from "lucide-react";
import ActionIcon from "../../../components/Common/ActionIcon";
import { IconButton } from "@mui/material";

export default function Usuarios() {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { usuarios, setClientes, formData, setFormData } = useUserStore();

  const AddUsuario = () => {
    setFormData(UsuarioVacio);
  };

  const icons: React.ReactNode[] = [
    <IconButton
      color="primary"
      onClick={AddUsuario}
      key="btn[0][0]"
    >
      <Plus />
    </IconButton>,
    <IconButton
      color="primary"
      onClick={() => Clientes()}
      key="btn[0][1]"
    >
      <Save />
    </IconButton>,
  ];

  const handleRowClick = (row: IUsuario) => {
    setFormData(row);
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
        Cell: ({ renderedCellValue }) => (
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={renderedCellValue ? true : false}
              className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ),
      },
    ],
    []
  );

  const Clientes = async () => {
    const response = await getUsuarios();
    const data: IUsuarios = response;
    setClientes(data);
    setIsloading(false);
  };

  useEffect(() => {
    setFormData(UsuarioVacio);
    Clientes();
  }, []);

  return (
    <>
      <Card
        icons={icons}
        title="Gestión de usuarios"
        texts={[]}
        content={
          <>
            <div className="flex">
              <div className="w-3/5">
                <TableMaterialR
                  columns={columns}
                  data={usuarios ? usuarios.data : []}
                  isLoading={isLoading}
                  enableButtons={false}
                  enablePagination={false}
                  blockLeft={[
                    "mrt-row-expand",
                    "mrt-row-select",
                    "mrt-row-actions",
                    "nombres",
                  ]}
                  actions={() => {}}
                  clickEvent={handleRowClick}
                />
              </div>
              <div className="w-2/5">
                <Setting usuario={formData} />
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
