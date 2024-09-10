import { useEffect, useMemo, useState } from "react";
// import { getClientes } from "../../services/clienteService";
// import { ICliente, IClientes } from "../../types/ICliente";
import CustomerDetails from "../../../components/Common/TableMaterialR";
import { MRT_ColumnDef } from "material-react-table";
import { IUsuario, IUsuarios } from "../../../types/IUsuario";
import { getUsuarios } from "../../../services/usuarioService";
import Setting from "./Setting";
import { useUserStore } from "../../../store/UserStore";
import Card from "../../../components/Common/Card";
// import { useDashboardStore } from "../../../store/store";

export default function Usuarios() {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { usuarios, setClientes } = useUserStore((state) => ({
    usuarios: state.usuarios,
    setClientes: state.setClientes,
  }));

  // const [activeTab, setActiveTab] = useState(0);

  const columns = useMemo<MRT_ColumnDef<IUsuario>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableHiding: false, // Evita que la columna se pueda mostrar
        size: 0, // Tamaño de la columna (opcional)
        columnVisibility: "hidden",
        enableColumnActions: false,
      },
      {
        accessorKey: "nombres",
        header: "Nombres",
        enableHiding: false,
        enableColumnActions: false,
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

  useEffect(() => {
    const Clientes = async () => {
      const response = await getUsuarios();
      const data: IUsuarios = response;
      setClientes(data);
      setIsloading(false);
    };

    Clientes();
  }, []);

  return (
    <>
      <Card
        icons={[]}
        title="Gestión de usuarios"
        texts={[]}
        content={
          <>
            <div className="flex">
              <div className="w-3/5">
                <CustomerDetails
                  columns={columns}
                  data={usuarios ? usuarios.data : []}
                  isLoading={isLoading}
                  enableButtons={false}
                  enablePagination={false}
                  blockLeft={[
                    "mrt-row-expand",
                    "mrt-row-select",
                    "mrt-row-actions",
                  ]}
                ></CustomerDetails>
              </div>
              <div className="w-2/5">
                <Setting />
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
