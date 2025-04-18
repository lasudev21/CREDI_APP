/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { IClientes, ICliente, ClienteVacio } from "../../../types/ICliente";
import {
  changeCliente,
  getClientes,
  getHistorialCliente,
  getReferencias,
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
import { IconButton } from "@mui/material";
import { IUsuario } from "../../../types/IUsuario";
import { useNavigate } from "react-router-dom";
import Historial from "../../../components/Administracion/Clientes/Historial";
import { IClienteReferencia } from "../../../types/IClienteReferencia";

export default function Clientes() {
  const navigate = useNavigate();
  const [contentDrawer, setContentDrawer] = useState<React.ReactNode>(null);
  const [titleDrawer, setTitleDrawer] = useState<string>("");
  const {
    toggleDrawer,
    setLoader,
    setErrorsToast,
    showDrawer,
    validarPermiso,
    isMobile,
  } = useDashboardStore();
  const {
    isLoading,
    setIsloading,
    data,
    setData,
    creditosActivos,
    setFormData,
    formData,
  } = useClienteStore();
  const { setOpenModal } = useDashboardStore();
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
              className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500"
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

  useEffect(() => {
    toggleDrawer(false);
    setOpenModal(false);

    if (!validarPermiso("Clientes")) {
      navigate("/permisos");
    } else {
      Clientes();
    }
  }, []);

  useEffect(() => {
    setLoader(true);
    setContentDrawer(<Setting cliente={formData} />);
    setTitleDrawer("Agregar/Editar Cliente");
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [formData]);

  useEffect(() => {
    setTitleDrawer("Historial de créditos");
    setContentDrawer(<Historial data={historial} />);
    setLoader(false);
  }, [historial]);

  const AddClient = () => {
    setFormData(ClienteVacio);
    setTimeout(() => {
      toggleDrawer(true);
    }, 500);
  };

  const actionsCliente = (action: number, cliente: ICliente | IUsuario) => {
    cliente = cliente as ICliente;

    if (action === 1) SeeClient(cliente);
    else if (action === 2) StateClient(cliente);
    else SeeHistory(cliente);
  };

  const SeeClient = async (cliente: ICliente) => {
    const referencias = await getReferencias(cliente.id);
    const data: IClienteReferencia[] = referencias.data;
    
    cliente.clientes_referencias = data;
    setFormData(cliente);
    
    setTimeout(() => {
      toggleDrawer(true);
    }, 500);
  };

  const SeeHistory = async (cliente: ICliente) => {
    setLoader(true);
    const response: ICreditoHistorialCliente[] = await getHistorialCliente(
      cliente.id
    );

    setHistorial(response);
    setTimeout(() => {
      toggleDrawer(true);
    }, 500);
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
        if (data) {
          setErrorsToast([
            {
              message: "Se ha cambiado el estado al cliente",
              type: TypeToastEnum.Susccess,
            },
          ]);
          setData(data);
        }
        setLoader(false);
      }
    });
  };

  const icons: React.ReactNode[] = [
    <IconButton
      color="primary"
      onClick={AddClient}
      key="btn[0][0]"
      title="Agregar cliente"
    >
      <Plus />
    </IconButton>,
    <IconButton
      color="primary"
      onClick={() => Clientes()}
      key="btn[0][1]"
      title="Refrescar"
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

  return (
    <>
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
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              {data.length ?? 0}
            </span>
          </label>,
          <label
            key={"Label[0][1]"}
            className="mr-3"
          >
            Con crédito activo
            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-2">
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
                    !isMobile ? "titular" : "",
                  ]}
                  actions={actionsCliente}
                  typeAction="cliente"
                  clickEvent={() => {}}
                />
              </div>
            </div>
          </>
        }
      />
      {showDrawer && (
        <Drawer
          size={isMobile ? "w-full" : "w-3/4"}
          title={titleDrawer}
          content={contentDrawer}
          accion={() => {}}
        />
      )}
    </>
  );
}
