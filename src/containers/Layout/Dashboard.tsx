import { Avatar, Card, CardHeader } from "@mui/material";
import { blue } from "@mui/material/colors";
import { HandCoinsIcon, ListPlusIcon, Repeat1Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashBoardData } from "../../services/dashboardService";
import { ICoteosUsuario, IDashboard, IDataValue } from "../../types/IDashboard";
import LineChart from "../../components/Dashboard/LineChart";
import UltimosCoteos from "../../components/Dashboard/UltimosCoteos";
import moment from "moment";

export default function Dashboard() {
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

  useEffect(() => {
    getDashBoard();
    const first = moment().startOf("month").format("YYYY-MM-DD");
    setFirstDay(first);

    const last = moment().endOf("month").format("YYYY-MM-DD");
    setLastDay(last);

    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 290;
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(user);

  return (
    <div className="w-full rounded-t-lg">
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="flex flex-col col-span-9">
          <p className="text-xl text-sky-500 font-extralight italic dark:text-white">
            ¡Bienvenido/a de nuevo!
            <span className="font-semibold ml-2">
              {user.Nombres} {user.Apellidos}
            </span>
          </p>
          <p className="font-thin">
            A continuación encontrará un resumen de los movimientos de su cartera en el último
            mes
          </p>
        </div>
        <div className="flex flex-row-reverse col-span-3 italic">
          <span className="font-semibold ml-2">
            {firstDay} <span className="font-light">a</span> {lastDay}
          </span>
          <span className="font-light">Fechas del reporte:</span>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-4">
          <Card
            sx={{}}
            className="w-full dark:bg-gray-800 dark:border-gray-700 border-l-2 border-sky-800"
          >
            <CardHeader
              sx={{
                ".MuiCardHeader-title": {
                  fontSize: "1.5rem",
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
        <div className="col-span-4">
          <Card
            sx={{}}
            className="w-full dark:bg-gray-800 dark:border-gray-700 border-l-2 border-sky-800"
          >
            <CardHeader
              sx={{
                ".MuiCardHeader-title": {
                  fontSize: "1.5rem",
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
        <div className="col-span-4">
          <Card
            sx={{}}
            className="w-full dark:bg-gray-800 dark:border-gray-700 border-l-2 border-sky-800"
          >
            <CardHeader
              sx={{
                ".MuiCardHeader-title": {
                  fontSize: "1.5rem",
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
        <div className="col-span-4 flex-col">
          <div className="">
            <p className="text-xl text-sky-500 font-extralight italic dark:text-white mb-2">
              Coteos pos usuario
            </p>

            <UltimosCoteos coteosUsuarios={coteosUsuarios} />
          </div>
          {/* <div>1</div> */}
        </div>
        <div className="col-span-8 bg-white">
          <LineChart
            dataNuevos={clientesNew}
            dataRenovados={clientesRen}
          />
        </div>
      </div>
    </div>
  );
}
