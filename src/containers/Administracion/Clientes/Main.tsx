import { useEffect, useMemo, useState } from "react";
import CustomerDetails from "../../../components/Common/TableMaterialR";
import { MRT_ColumnDef } from "material-react-table";
import { IClientes, ICliente } from "../../../types/ICliente";
import { getClientes } from "../../../services/clienteService";
import Card from "../../../components/Common/Card";
import Drawer from "../../../components/Common/Drawer";
import { useDashboardStore } from "../../../store/DashboardStore";
import { Plus } from "lucide-react";
import ActionIcon from "../../../components/Common/ActionIcon";
import Setting from "../Clientes/Setting";

export default function Clientes() {
  const [clientes, setClientes] = useState<IClientes>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const toggle = useDashboardStore((state) => state.toggleDrawer);
  const showDrawer = useDashboardStore((state) => state.showDrawer);

  const columns = useMemo<MRT_ColumnDef<ICliente>[]>(
    () => [
      {
        accessorKey: "titular",
        header: "Titular",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        enableHiding: false,
        enableColumnActions: false,
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={() => {}}
              checked={renderedCellValue ? true : false}
              className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ),
      },
      {
        accessorKey: "fiador",
        header: "Fiador",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "cc_fiador",
        header: "CC Fiador",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "neg_titular",
        header: "Negocio titular",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "neg_fiador",
        header: "Negocio fiador",
        enableHiding: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "dir_cobro",
        header: "Dirección Cobro",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
    ],
    []
  );

  const AddClient = () => {
    toggle(true);
  };

  const icons: React.ReactNode[] = [
    <ActionIcon
      IconComponent={Plus}
      action={AddClient}
      key="btn[0][0]"
    />,
  ];

  useEffect(() => {
    const Clientes = async () => {
      const response = await getClientes();
      const data: IClientes = response;
      setClientes(data);
      setIsloading(false);
    };

    Clientes();
  }, [clientes]);

  return (
    <>
      <Card
        key={"Card[0][1]"}
        title="Gestión de clientes"
        icons={icons}
        texts={[
          <label key={'Label[0][0]'} className="mr-3">
            Total{" "}
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-sky-900 dark:text-sky-300">
              {clientes?.data.length ?? 0}
            </span>
          </label>,
          <label key={'Label[0][1]'} className="mr-3">
            Con crédito activo{" "}
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-sky-900 dark:text-sky-300">
              {clientes?.creditosActivos ?? 0}
            </span>
          </label>,
        ]}
        content={
          <>
            <div className="flex">
              <div className="w-full">
                <CustomerDetails
                  columns={columns}
                  data={clientes ? clientes.data : []}
                  isLoading={isLoading}
                  enableButtons={false}
                  enablePagination={true}
                  blockLeft={[
                    "mrt-row-expand",
                    "mrt-row-select",
                    "mrt-row-actions",
                  ]}
                ></CustomerDetails>
              </div>
            </div>
          </>
        }
      />
      {showDrawer && (
        <Drawer
          size="w-3/4"
          title="Agregar/Editar Usuario"
          content={<Setting />}
        />
      )}
    </>
  );
}
