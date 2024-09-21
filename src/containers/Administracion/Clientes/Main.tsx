import { useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { IClientes, ICliente, ClienteVacio } from "../../../types/ICliente";
import {
  changeCliente,
  getClientes,
  getHistorialCliente,
} from "../../../services/clienteService";
import Card from "../../../components/Common/Card";
import Drawer from "../../../components/Common/Drawer";
import { useDashboardStore } from "../../../store/DashboardStore";
import { Plus, RotateCw } from "lucide-react";
import Setting from "../Clientes/Setting";
import TableMaterialR from "../../../components/Common/TableMaterialR";
import { useClienteStore } from "../../../store/ClienteStore";
import Swal from "sweetalert2";
import { TypeToastEnum } from "../../../types/IToast";
import { ICreditoHistorialCliente } from "../../../types/ICredito";
import Modal from "../../../components/Common/Modal";
import Historial from "../../../components/Administracion/Creditos/Historial";
import { IconButton } from "@mui/material";

export default function Clientes() {
  const { toggleDrawer, setLoader, setErrorsToast, showDrawer } =
    useDashboardStore();
  const {
    isLoading,
    setIsloading,
    data,
    setData,
    creditosActivos,
    setFormData,
    formData,
  } = useClienteStore();
  const { setOpenModal, openModal } = useDashboardStore();
  const [historial, setHistorial] = useState<ICreditoHistorialCliente[]>([]);

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
        Cell: ({ renderedCellValue, staticRowIndex }) => (
          <div className="flex items-center">
            <input
              id={`Chechk-${renderedCellValue}-${staticRowIndex}`}
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
      {
        accessorKey: "barrio_cobro",
        header: "Barrio cobro",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "dir_casa",
        header: "Dirección casa",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "barrio_casa",
        header: "Barrio casa",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "tel_casa",
        header: "Teléfono casa",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "dir_fiador",
        header: "Dirección fiador",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "barrio_fiador",
        header: "Barrio fiador",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "tel_fiador",
        header: "Teléfono fiador",
        enableHiding: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
      },
    ],
    []
  );

  const AddClient = () => {
    toggleDrawer(true);
    setFormData(ClienteVacio);
  };

  const actionsCliente = (action: number, cliente: ICliente) => {
    if (action === 1) SeeClient(cliente);
    else if (action === 2) StateClient(cliente);
    else SeeHistory(cliente);
  };

  const SeeClient = (cliente: ICliente) => {
    toggleDrawer(true);
    setFormData(cliente);
  };

  const SeeHistory = async (cliente: ICliente) => {
    setLoader(true);
    const response: ICreditoHistorialCliente[] = await getHistorialCliente(
      cliente.id
    );
    setHistorial(response);
    setOpenModal(true);
    setLoader(false);
  };

  const StateClient = async (cliente: ICliente) => {
    Swal.fire({
      text: `ESTA SEGURO QUE QUIERE CAMBIAR EL ESTADO AL CLIENTE ${cliente.titular}?`,
      // type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        setLoader(true);
        const response = await changeCliente(cliente.id);
        const data: IClientes = response;
        setErrorsToast([
          {
            message: "Se ha cambiado el estado al cliente",
            type: TypeToastEnum.Susccess,
          },
        ]);
        setData(data);
        setLoader(false);
      }
    });
  };

  const icons: React.ReactNode[] = [
    <IconButton
      color="primary"
      onClick={AddClient}
      key="btn[0][0]"
    >
      <Plus />
    </IconButton>,
    <IconButton
      color="primary"
      onClick={() => Clientes()}
      key="btn[0][1]"
    >
      <RotateCw />
    </IconButton>,
  ];

  const Clientes = async () => {
    setIsloading(true);
    const response = await getClientes();
    const data: IClientes = response;
    setData(data);
    setIsloading(false);
  };

  useEffect(() => {
    toggleDrawer(false);
    setOpenModal(false);
    Clientes();
  }, []);

  return (
    <>
      {openModal && (
        <Modal
          title="Historial de créditos"
          content={<Historial data={historial} />}
          size="max-w-3xl"
        />
      )}
      <Card
        key={"Card[0][1]"}
        title="Gestión de clientes"
        icons={icons}
        texts={[
          <label
            key={"Label[0][0]"}
            className="mr-3"
          >
            Total
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-sky-900 dark:text-sky-300 ml-2">
              {data.length ?? 0}
            </span>
          </label>,
          <label
            key={"Label[0][1]"}
            className="mr-3"
          >
            Con crédito activo
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-sky-900 dark:text-sky-300  ml-2">
              {creditosActivos}
            </span>
          </label>,
        ]}
        content={
          <>
            <div className="flex">
              <div className="w-full">
                <TableMaterialR
                  columns={columns}
                  data={data}
                  isLoading={isLoading}
                  enableButtons={true}
                  enablePagination={true}
                  blockLeft={[
                    "mrt-row-expand",
                    "mrt-row-select",
                    "mrt-row-actions",
                    "titular",
                  ]}
                  actions={actionsCliente}
                  clickEvent={() => {}}
                />
              </div>
            </div>
          </>
        }
      />
      {showDrawer && (
        <Drawer
          size="w-3/4"
          title="Agregar/Editar Cliente"
          content={<Setting cliente={formData} />}
          accion={() => {}}
        />
      )}
    </>
  );
}
