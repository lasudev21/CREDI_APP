import React, { useEffect, useState } from "react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { PlusCircleIcon, Printer, Repeat, Save, Search } from "lucide-react";
import { useRutaStore } from "../../../store/RutaStore";
import { getPeriodos, getRutas } from "../../../services/parametroService";
import { IItemsCBox, IPeriodos } from "../../../types/IRuta";
import VerRutas from "../../../components/Cobros/Rutas/VerRutas";
import { NumberFormat } from "../../../utils/helper";
import TableAGReact from "../../../components/Common/TableAGReact";
import { useDashboardStore } from "../../../store/DashboardStore";
import DnDRutas from "../../../components/Cobros/Rutas/DnDRutas";
import Drawer from "../../../components/Common/Drawer";
import Modal from "../../../components/Common/Modal";
import AgregarClientes from "../../../components/Cobros/Rutas/AgregarClientes";
import { IconButton } from "@mui/material";
import { UsuarioVacio } from "../../../types/IUsuario";
import Setting from "../../Administracion/Clientes/Setting";
import { ClienteVacio } from "../../../types/ICliente";

function currencyFormatter(params: ValueFormatterParams) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return "";
  }
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const Rutas = () => {
  const {
    setRutas,
    setPeriodos,
    rutas,
    cobrador,
    data,
    cartera,
    rutaId,
    setRutaId,
    totalRecord,
    disabled,
    setDisable,
    setData,
  } = useRutaStore((state) => state);

  const [height, setHeight] = useState<number>(0);

  const [sizeDrawer, setSizeDrawer] = useState<string>("");
  const [contentDrawer, setContentDrawer] = useState<React.ReactNode>(null);
  const [titleDrawer, setTitleDrawer] = useState<string>("");

  const [size, setSize] = useState<string>("");
  const [contentModal, setContentModal] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string>("");

  const { toggleDrawer, showDrawer, setLoader, openModal, setOpenModal } =
    useDashboardStore();

  const Rutas = async () => {
    setLoader(true);
    const response = await getRutas();
    const data: IItemsCBox[] = response;
    setRutas(data);
    setLoader(false);
  };

  const Periodos = async () => {
    setLoader(true);
    const response = await getPeriodos();
    const data: IPeriodos = response;
    setPeriodos(data);
    setLoader(false);
  };

  const modalAction = async (tipo: string) => {
    switch (tipo) {
      case "addCliente":
        setContentModal(<AgregarClientes accion={drawerAction} />);
        setTitle("Gestionar créditos");
        setSize("max-w-7xl");
        break;
      case "seeRutas":
        setContentModal(<VerRutas rutas={rutas} />);
        setTitle("Seleccione la ruta que desea consultar...");
        setSize("max-w-2xl");
        break;
    }
    setOpenModal(true);
  };

  const drawerAction = async (tipo: string) => {
    switch (tipo) {
      case "enrutar":
        setContentDrawer(<DnDRutas />);
        setSizeDrawer("w-2/5");
        setTitleDrawer("Enrutar clientes");
        break;
      case "nuevoCliente":
        setContentDrawer(<Setting cliente={ClienteVacio} />);
        setSizeDrawer("w-3/5");
        setTitleDrawer("Agregar cliente");
        break;

      default:
        break;
    }
    toggleDrawer(true);
  };

  useEffect(() => {
    setOpenModal(false);
    setLoader(false);
    setRutaId(0);
    setDisable(true);
    setData({
      cartera: 0,
      cobrador: UsuarioVacio,
      data: [],
    });
    Periodos();
    Rutas();

    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 185;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [colDefs] = useState<ColDef[]>([
    { field: "orden", headerName: "Ord", pinned: "left", width: 70 },
    { field: "obs_dia", headerName: "Día", pinned: "left", width: 70 },
    {
      field: "cliente.titular",
      headerName: "Cliente",
      width: 250,
      pinned: "left",
    },
    {
      field: "cuota",
      headerName: "Cuota",
      pinned: "left",
      editable: true,
      width: 70,
      cellStyle: { backgroundColor: "#f0f8ff" },
      valueParser: (params) => {
        const newValue = Number(params.newValue);
        return isNaN(newValue) ? params.oldValue : newValue;
      },
      valueFormatter: (params: ValueFormatterParams) => {
        return params.value !== null && params.value !== undefined
          ? params.value.toString()
          : "";
      },
    },
    {
      field: "mora",
      headerName: "Mora",
      pinned: "left",
      cellClass: "ag-cell-center",
      width: 70,
      cellStyle: (params) => {
        switch (true) {
          case params.value >= 5 && params.value <= 9:
            return { backgroundColor: "#FBF462", color: "white" };
          case params.value >= 10 && params.value <= 19:
            return { backgroundColor: "#F1775C", color: "white" };
          case params.value > 20:
            return { backgroundColor: "#A25EEA", color: "white" };
          default:
            return { backgroundColor: "", color: "black" };
        }
      },
    },
    { field: "cuotas_pagas", headerName: "PAG", width: 70 },
    {
      field: "valor_prestamo",
      headerName: "Prestamo",
      type: "currency",
      valueFormatter: currencyFormatter,
    },
    { field: "mod_dias", headerName: "Días", width: 70 },
    {
      field: "saldo",
      headerName: "Saldo",
      width: 150,
      type: "currency",
      valueFormatter: currencyFormatter,
    },
    {
      field: "valor_total",
      headerName: "Total",
      width: 150,
      type: "currency",
      valueFormatter: currencyFormatter,
    },
    {
      field: "valor_ultimo_pago",
      headerName: "Valor ult pago",
      width: 150,
      type: "currency",
      valueFormatter: currencyFormatter,
    },
    {
      field: "fecha_ultimo_pago",
      headerName: "Fecha ult pago",
      type: "date",
      width: 150,
    },
    { field: "inicio_credito", headerName: "Inicio", width: 150 },
    {
      field: "cliente.neg_titular",
      headerName: "Negocio",
      width: 250,
    },
    {
      field: "cliente.dir_cobro",
      headerName: "Dirección",
      width: 250,
    },
    {
      field: "cliente.tel_cobro",
      headerName: "Teléfono",
      width: 150,
    },
    {
      field: "cliente.fiador",
      headerName: "Fiador",
      width: 250,
    },
    {
      field: "cliente.tel_fiador",
      headerName: "Teléfono",
      width: 150,
    },
  ]);

  return (
    <>
      {showDrawer && (
        <Drawer
          size={sizeDrawer}
          title={titleDrawer}
          content={contentDrawer}
        />
      )}
      <div className="h-full w-full grid mt-4 border-l-4 rounded-l border-sky-600">
        <div className="flex justify-between items-center p-2 bg-[#E5E5E7] border-b-2 border-sky-600 rounded-br">
          <div className="flex w-3/4 pr-2">
            <div className="flex flex-col mx-4">
              <p className="font-light">Ruta</p>
              <p className="flex font-semibold">
                <span>
                  {rutaId !== 0
                    ? rutas.find((x) => x.value === rutaId)?.label
                    : "---"}
                </span>
                <Search
                  size={20}
                  onClick={() => modalAction("seeRutas")}
                  className="text-sky-600 hover:text-sky-800 ml-2 rounded transition-all"
                />
              </p>
            </div>
            <div className="flex flex-col mx-4">
              <p className="font-light">Cartera</p>
              <p className="font-semibold">{NumberFormat(cartera)}</p>
            </div>
            <div className="flex flex-col mx-4">
              <p className="font-light">Cobrador</p>
              <p className="font-semibold">
                {cobrador && `${cobrador.nombres} ${cobrador.apellidos}`}
              </p>
            </div>
          </div>

          <div className="w-1/4 pl-2 flex justify-end">
            <div className="flex space-x-2">
              <IconButton
                // disabled={disabled}
                color="primary"
                onClick={() => modalAction("addCliente")}
              >
                <PlusCircleIcon />
              </IconButton>

              <IconButton
                // disabled={disabled}
                color="primary"
                onClick={() => drawerAction("enrutar")}
              >
                <Repeat />
              </IconButton>

              <IconButton
                // disabled={disabled}
                color="primary"
              >
                <Save />
              </IconButton>

              <IconButton
                // disabled={disabled}
                color="primary"
              >
                <Printer />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="border">
          <div
            className="ag-theme-quartz"
            style={{ height: "100%" }}
          >
            <TableAGReact
              colDefs={colDefs}
              data={data}
              key={"TAGR[0][0]"}
              pagination={false}
              height={height}
              actionPagining={() => {}}
              totalRecords={totalRecord}
              autoSize={false}
            />
          </div>
        </div>

        {/* {isModalOpen && <ModalRutas rutas={rutas} />} */}
        {openModal && (
          <Modal
            content={contentModal}
            title={title}
            size={size}
          />
        )}
      </div>
    </>
  );
};
export default Rutas;
