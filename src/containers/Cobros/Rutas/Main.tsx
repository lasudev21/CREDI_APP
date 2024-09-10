import { useEffect, useState } from "react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { PlusCircleIcon, Printer, Repeat, Save, Search } from "lucide-react";
import { useRutaStore } from "../../../store/RutaStore";
import { getPeriodos, getRutas } from "../../../services/parametroService";
import { IItemsCBox, IPeriodos } from "../../../types/IRuta";
import ModalRutas from "../../../components/Rutas/ModalRutas";
import { NumberFormat } from "../../../utils/helper";
import TableAGReact from "../../../components/Common/TableAGReact";
import { useDashboardStore } from "../../../store/DashboardStore";
import DnDRutas from "../../../components/Rutas/DnDRutas";
import Drawer from "../../../components/Common/Drawer";

function currencyFormatter(params: ValueFormatterParams) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return "";
  }
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function clientFormatter(params: ValueFormatterParams, llave: string) {
  let value = "";

  if (params.data.cliente[llave] != null) value = params.data.cliente[llave];

  return value;
}

const Rutas = () => {
  const {
    isModalOpen,
    setIsModal,
    setRutas,
    setPeriodos,
    rutas,
    cobrador,
    data,
    cartera,
    rutaId,
    totalRecord,
  } = useRutaStore((state) => state);
  const [height, setHeight] = useState<number>(0);
  const { toggleDrawer, showDrawer, setLoader } = useDashboardStore();

  const Rutas = async () => {
    const response = await getRutas();
    const data: IItemsCBox[] = response;
    setRutas(data);
    setLoader(false);
  };

  const Periodos = async () => {
    const response = await getPeriodos();
    const data: IPeriodos = response;
    setPeriodos(data);
  };

  useEffect(() => {
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
      field: "client",
      headerName: "Cliente",
      width: 250,
      pinned: "left",
      valueFormatter: (params: ValueFormatterParams) =>
        clientFormatter(params, "titular"),
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
        if (params.value >= 5) {
          return { backgroundColor: "rgb(251, 244, 98)", color: "white" };
        } else if (params.value > 50) {
          return { backgroundColor: "green", color: "white" };
        } else {
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
      field: "cliente",
      headerName: "Negocio",
      width: 250,
      valueFormatter: (params: ValueFormatterParams) =>
        clientFormatter(params, "neg_titular"),
    },
    {
      field: "cliente",
      headerName: "Dirección",
      width: 250,
      valueFormatter: (params: ValueFormatterParams) =>
        clientFormatter(params, "dir_cobro"),
    },
    {
      field: "cliente",
      headerName: "Teléfono",
      width: 150,
      valueFormatter: (params: ValueFormatterParams) =>
        clientFormatter(params, "tel_cobro"),
    },
    {
      field: "cliente",
      headerName: "Fiador",
      width: 250,
      valueFormatter: (params: ValueFormatterParams) =>
        clientFormatter(params, "fiador"),
    },
    {
      field: "cliente",
      headerName: "Teléfono",
      width: 150,
      valueFormatter: (params: ValueFormatterParams) =>
        clientFormatter(params, "tel_fiador"),
    },
  ]);

  return (
    <>
      {showDrawer && (
        <Drawer
          size="w-2/5"
          title="Enrutar clientes"
          content={<DnDRutas />}
        />
      )}
      <div className="h-full w-full grid mt-4 border-l-4 rounded-l border-sky-600">
        <div className="flex justify-between items-center p-2 bg-gray-300 border-b-2 border-sky-600 rounded-br">
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
                  onClick={() => setIsModal(true)}
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
              <PlusCircleIcon
                size={20}
                className="hover:text-sky-600 ml-2 rounded transition-all"
              />
              <Repeat
                size={20}
                onClick={() => toggleDrawer(true)}
                className="hover:text-sky-600 ml-2 rounded transition-all"
              />
              <Save
                size={20}
                className="hover:text-sky-600 ml-2 rounded transition-all"
              />
              <Printer
                size={20}
                className="hover:text-sky-600 ml-2 rounded transition-all"
              />
            </div>
          </div>
        </div>

        <div
          className="border"
          // style={{ height: "calc(100vh - 185px)" }}
        >
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
              actionPagining={() => console.log("Hola")}
              totalRecords={totalRecord}
              autoSize={false}
            />
          </div>
        </div>

        {isModalOpen && <ModalRutas rutas={rutas} />}
      </div>
    </>
  );
};
export default Rutas;
