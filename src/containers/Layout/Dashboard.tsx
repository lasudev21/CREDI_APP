/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Card, CardHeader } from "@mui/material";
import { blue } from "@mui/material/colors";
import { HandCoinsIcon, ListPlusIcon, Repeat1Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashBoardData } from "../../services/dashboardService";
import { ICoteosUsuario, IDashboard, IDataValue } from "../../types/IDashboard";
import LineChart from "../../components/Dashboard/LineChart";
import UltimosCoteos from "../../components/Dashboard/UltimosCoteos";
import moment from "moment";
import { useDashboardStore } from "../../store/DashboardStore";
import Tabs from "../../components/Common/Tab";
import BarChart from "../../components/Dashboard/BarChart";
import { getDatosDias } from "../../services/parametroService";
import { IItemsCBoxV1 } from "../../types/IRuta";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [nuevos, setNuevos] = useState<number>(0);
  const [renovados, setRenovados] = useState<number>(0);
  const [coteos, setCoteos] = useState<number>(0);
  const [clientesNew, setClientesNew] = useState<IDataValue[]>([]);
  const [clientesRen, setClientesRen] = useState<IDataValue[]>([]);
  const [coteosUsuarios, setCoteosUsuarios] = useState<ICoteosUsuario[]>([]);
  const [height, setHeight] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [firstDay, setFirstDay] = useState<string>("");
  const [lastDay, setLastDay] = useState<string>("");
  const { setOpenModal, toggleDrawer, setLoader, setDias } =
    useDashboardStore();

  const getDashBoard = async () => {
    const response = await getDashBoardData();
    const data: IDashboard = response;
    setNuevos(data.cantNew);
    setRenovados(data.cantRen);
    setCoteos(data.totalCoteo);
    setClientesNew(data.clientesNew);
    setClientesRen(data.clientesRen);
    setCoteosUsuarios(data.coteosUsuarios);
  };

  const getDias = async () => {
    const response = await getDatosDias();
    const data: IItemsCBoxV1[] = response;
    setDias(data);
  };

  useEffect(() => {
    getDashBoard();
    getDias();
    setOpenModal(false);
    toggleDrawer(false);
    setLoader(false);
    const first = moment().startOf("month").format("YYYY-MM-DD");
    setFirstDay(first);

    const last = moment().endOf("month").format("YYYY-MM-DD");
    setLastDay(last);

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      console.log(isMobile);
      const calculatedHeight = isMobile ? 300 : window.innerHeight - 290;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setLoader, setOpenModal, toggleDrawer, height]);

  return (
    <div className="w-full rounded-t-lg px-4 pb-10">
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="flex flex-col col-span-12 lg:col-span-9">
          <p className="text-lg sm:text-xl text-sky-500 font-extralight italic">
            ¡Bienvenido/a de nuevo!
            <span className="font-semibold ml-2">
              {user.Nombres} {user.Apellidos}
            </span>
          </p>
          <p className="font-thin text-sm sm:text-base">
            A continuación encontrará un resumen de los movimientos de su
            cartera en el último mes.
          </p>
        </div>
        <div className="flex flex-row-reverse col-span-12 lg:col-span-3 italic">
          <span className="font-semibold ml-2 text-sm sm:text-base">
            {firstDay} <span className="font-light">a</span> {lastDay}
          </span>
          <span className="font-light">Fechas del reporte:</span>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 sm:col-span-4 lg:col-span-4">
          <Card className="w-full border-l-2 border-sky-800">
            <CardHeader
              sx={{
                ".MuiCardHeader-title": {
                  fontSize: "1.25rem",
                },
              }}
              avatar={
                <Avatar
                  sx={{ bgcolor: blue[600] }}
                  aria-label="recipe"
                >
                  <ListPlusIcon />
                </Avatar>
              }
              title={nuevos}
              subheader="Clientes nuevos"
            />
          </Card>
        </div>
        <div className="col-span-12 sm:col-span-4 lg:col-span-4">
          <Card className="w-full border-l-2 border-sky-800">
            <CardHeader
              sx={{
                ".MuiCardHeader-title": {
                  fontSize: "1.25rem",
                },
              }}
              avatar={
                <Avatar
                  sx={{ bgcolor: blue[400] }}
                  aria-label="recipe"
                >
                  <Repeat1Icon />
                </Avatar>
              }
              title={renovados}
              subheader="Renovaciones"
            />
          </Card>
        </div>
        <div className="col-span-12 sm:col-span-4 lg:col-span-4">
          <Card className="w-full border-l-2 border-sky-800">
            <CardHeader
              sx={{
                ".MuiCardHeader-title": {
                  fontSize: "1.25rem",
                },
              }}
              avatar={
                <Avatar
                  sx={{ bgcolor: blue[600] }}
                  aria-label="recipe"
                >
                  <HandCoinsIcon />
                </Avatar>
              }
              title={coteos}
              subheader="Coteos del mes"
            />
          </Card>
        </div>
      </div>
      <div
        className="grid grid-cols-12 gap-4"
        style={{ height }}
      >
        <div
          className="col-span-12 lg:col-span-8 bg-white"
          style={{ height: "100%" }}
        >
          <Tabs
            key={"Gr[0][1]"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              {
                label: "Gráfico Lineal",
                content: (
                  <LineChart
                    dataNuevos={clientesNew}
                    dataRenovados={clientesRen}
                  />
                ),
              },
              {
                label: "Gráfico de Barras",
                content: (
                  <BarChart
                    dataNuevos={clientesNew}
                    dataRenovados={clientesRen}
                  />
                ),
              },
            ]}
          />
        </div>
        <div className="col-span-12 lg:col-span-4 flex-col">
          <p className="text-lg sm:text-xl text-sky-500 font-extralight italic mb-2">
            Coteos por usuario
          </p>
          <UltimosCoteos coteosUsuarios={coteosUsuarios} />
        </div>
      </div>
    </div>
  );
}
