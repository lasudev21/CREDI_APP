/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { getFechasReporte } from "../../../services/parametroService";
import { IItemsCBox } from "../../../types/IRuta";
import { Cog, Printer } from "lucide-react";
import { IconButton } from "@mui/material";
import { useDashboardStore } from "../../../store/DashboardStore";
import VerReporte from "../../../components/Reportes/Coteos/VerReporte";
import Modal from "../../../components/Common/Modal";
import Tabs from "../../../components/Common/Tab";
import { gatCoteos } from "../../../services/reporteService";
import {
  ApiResponse,
  ApiResponseV1,
  ICoteo,
  IReporteCoteo,
  NuevosYRenovados,
} from "../../../types/IReporte";
import { IUsuario } from "../../../types/IUsuario";
import moment from "moment";
import UtilidadRecaudo from "../../../components/Reportes/Coteos/UtilidadRecaudo";
import { IDataFU } from "../../../types/IFlujoUtilidades";
import { IDataFC } from "../../../types/IFlujoCaja";
import NuevosRenovaciones from "../../../components/Reportes/Coteos/NuevosRenovaciones";
import { ICredito } from "../../../types/ICredito";
import { ICreditoRenovacion } from "../../../types/ICreditoRenovacion";
import Corte from "../../../components/Reportes/Coteos/Corte";
import { exportarCoteos } from "../../../utils/pdfMakeExport";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const { validarPermiso, isMobile } = useDashboardStore();
  const [_dates, _setDates] = useState<IItemsCBox[]>([]);
  const [allDates, setAllDates] = useState<string[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const { openModal, setOpenModal, setLoader } = useDashboardStore();
  const [activeTab, setActiveTab] = useState(0);
  const [height, setHeight] = useState<number>(0);

  const gridRef1 = useRef<any>(null);
  const [rowData1, setRowData1] = useState<any[]>([]);
  const [columnDefs1, setColumnDefs1] = useState<any[]>([]);

  const gridRef2 = useRef<any>(null);
  const [rowData2, setRowData2] = useState<any[]>([]);
  const [columnDefs2, setColumnDefs2] = useState<any[]>([]);

  const gridRef3 = useRef<any>(null);
  const [rowData3, setRowData3] = useState<any[]>([]);
  const [columnDefs3, setColumnDefs3] = useState<any[]>([]);

  const [rowDataRen, setRowDataRen] = useState<any[]>([]);
  const [dateColumnsRen, setDateColumnsRen] = useState<string[]>([]);

  const [rowDataRec, setRowDataRec] = useState<any[]>([]);
  const [dateColumnsRec, setDateColumnsRec] = useState<string[]>([]);

  const [rowDataNuevosRen, setRowDataNuevosRen] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - 230;
      setHeight(calculatedHeight);
    };

    handleResize();

    setLoader(false);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateColumnDefs = (
    startDate: Date,
    endDate: Date,
    corte: number
  ) => {
    const cols = [
      {
        headerName: "COBRADOR",
        field: "cobrador",
        pinned: "left",
        cellStyle: { backgroundColor: "rgb(3 105 161 / 62%)", color: "white" },
      },
      {
        headerName: "CLIENTES CORTE " + corte,
        children: [
          { headerName: "DIARIOS", field: "diarios" },
          { headerName: "SEMANALES", field: "semanales" },
        ],
      },
    ];

    // Generar columnas de fechas dinámicas
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      cols.push({ headerName: dateString, field: dateString });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    cols.push(
      { headerName: "COTEADO", field: "coteado" },
      { headerName: "QUEDADO", field: "quedado" }
    );

    return cols;
  };

  const getValorModalidadDia = (
    dates: string[],
    list: ICoteo[],
    tipo: number
  ): number => {
    let ret = 0;

    dates.map((fecha: string) => {
      const data = list.filter(
        (x) => moment(x.fecha).format("YYYY-MM-DD") == fecha
      );

      if (data != undefined) {
        data.map((item) => {
          if (tipo === 1)
            ret = item.total_creditos_dia > 0 ? item.total_creditos_dia : 0;
          else ret = item.total_creditos_sem > 0 ? item.total_creditos_sem : 0;
        });
      }
    });
    return ret;
  };

  const getCoteo = (list: ICoteo[], fecha: string) => {
    let ret = 0;
    const data = list.filter(
      (x) => moment(x.fecha).format("YYYY-MM-DD") === fecha
    );

    if (data !== undefined) {
      data.map((item) => {
        ret = ret + item.coteos_dia;
      });
    }
    return ret;
  };

  const getTotalCorte = (
    fulData: IDataFU[] | IDataFC[],
    tipo: number,
    dates: string[],
    ruta: number,
    texto: string
  ): number => {
    let ret = 0;
    let data: IDataFU[] = [];

    switch (tipo) {
      case 0:
        data = fulData.filter(
          (item) =>
            moment(item.fecha).format("YYYY-MM-DD") <= dates[0] &&
            item.descripcion === `${texto} ${ruta}`
        );
        break;
      case 1:
        data = fulData.filter(
          (item) =>
            moment(item.fecha).format("YYYY-MM-DD") > dates[0] &&
            moment(item.fecha).format("YYYY-MM-DD") <= dates[1] &&
            item.descripcion === `${texto} ${ruta}`
        );
        break;

      case 2:
        data = fulData.filter(
          (item) =>
            moment(item.fecha).format("YYYY-MM-DD") > dates[1] &&
            item.descripcion === `${texto} ${ruta}`
        );
        break;

      default:
        break;
    }

    if (data.length > 0) {
      data.map((item: IDataFU) => {
        ret = ret + item.valor;
      });
    }

    return ret;
  };

  const generateRowData = (
    apiData: ApiResponse[],
    startDate: Date,
    endDate: Date
  ) => {
    return apiData.map((row) => {
      const newRow = { ...row };
      const currentDate = new Date(startDate);
      let dias = 0;
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        const rest = getCoteo(newRow.coteos, dateString);
        newRow.coteado = newRow.coteado + rest;
        dias = rest > 0 ? dias + 1 : dias;
        newRow[dateString] = rest;
        currentDate.setDate(currentDate.getDate() + 1);
      }
      newRow.quedado =
        newRow.diarios * dias + newRow.semanales - newRow.coteado;
      return newRow;
    });
  };

  const setDatosReporte = (reporte: IReporteCoteo, dates: string[]) => {
    let data: ApiResponse[] = [];

    reporte.data.map((user: IUsuario) => {
      const diarios = getValorModalidadDia(dates, user.coteos, 1);
      const semanales = getValorModalidadDia(dates, user.coteos, 2);
      data.push({
        cobrador: `${user.nombres} ${user.apellidos}`,
        diarios: diarios,
        semanales: semanales,
        coteado: 0,
        quedado: 0,
        coteos: user.coteos,
      });
    });
    data = generateRowData(
      data,
      new Date(dates[0]),
      new Date(dates[dates.length - 1])
    );
    return data;
  };

  const setDatosUtilidadRecaudo = (
    reporte: IReporteCoteo,
    dates: string[],
    tipo: number
  ) => {
    const baseData: ApiResponseV1[] = [];
    reporte.data.map((user: IUsuario) => {
      baseData.push({
        cobrador: `${user.nombres} ${user.apellidos}`,
        corte1: getTotalCorte(
          tipo === 1 ? reporte.utilidades : reporte.recaudos,
          0,
          dates,
          Number(user.ruta),
          tipo === 1 ? "Utilidad ruta" : "Cobros ruta"
        ),
        corte2: getTotalCorte(
          tipo === 1 ? reporte.utilidades : reporte.recaudos,
          1,
          dates,
          Number(user.ruta),
          tipo === 1 ? "Utilidad ruta" : "Cobros ruta"
        ),
        corte3: getTotalCorte(
          tipo === 1 ? reporte.utilidades : reporte.recaudos,
          2,
          dates,
          Number(user.ruta),
          tipo === 1 ? "Utilidad ruta" : "Cobros ruta"
        ),
      });
    });
    return baseData;
  };

  const getTotalCorteNuevo = (
    fulData: ICredito[],
    dates: string[],
    ruta: number,
    tipo: number
  ): number => {
    let ret = 0;
    let data: ICredito[] = [];

    switch (tipo) {
      case 0:
        data = fulData.filter(
          (item) =>
            moment(item.inicio_credito).format("YYYY-MM-DD") <= dates[0] &&
            item.ruta_id === ruta
        );
        break;
      case 1:
        data = fulData.filter(
          (item) =>
            moment(item.inicio_credito).format("YYYY-MM-DD") > dates[0] &&
            moment(item.inicio_credito).format("YYYY-MM-DD") <= dates[1] &&
            item.ruta_id === ruta
        );
        break;

      case 2:
        data = fulData.filter(
          (item) =>
            moment(item.inicio_credito).format("YYYY-MM-DD") > dates[1] &&
            item.ruta_id === ruta
        );
        break;

      default:
        break;
    }

    if (data.length > 0) {
      ret = ret + data.length;
    }

    return ret;
  };

  const getTotalCorteRenovacion = (
    fulData: ICreditoRenovacion[],
    dates: string[],
    ruta: number,
    tipo: number
  ): number => {
    let ret = 0;
    let data: ICreditoRenovacion[] = [];

    switch (tipo) {
      case 0:
        data = fulData.filter(
          (item) =>
            moment(item.fecha).format("YYYY-MM-DD") <= dates[0] &&
            item.credito.ruta_id === ruta
        );
        break;
      case 1:
        data = fulData.filter(
          (item) =>
            moment(item.fecha).format("YYYY-MM-DD") > dates[0] &&
            moment(item.fecha).format("YYYY-MM-DD") <= dates[1] &&
            item.credito.ruta_id === ruta
        );
        break;

      case 2:
        data = fulData.filter(
          (item) =>
            moment(item.fecha).format("YYYY-MM-DD") > dates[1] &&
            item.credito.ruta_id === ruta
        );
        break;

      default:
        break;
    }

    if (data.length > 0) {
      ret = ret + data.length;
    }

    return ret;
  };

  const setNuevosRenovados = (reporte: IReporteCoteo, dates: string[]) => {
    const data: NuevosYRenovados[] = [];
    reporte.data.map((user: IUsuario) => {
      data.push({
        cobrador: `${user.nombres} ${user.apellidos}`,
        nuevos_corte1: getTotalCorteNuevo(
          reporte.nuevos,
          dates,
          Number(user.ruta),
          0
        ),
        nuevos_corte2: getTotalCorteNuevo(
          reporte.nuevos,
          dates,
          Number(user.ruta),
          1
        ),
        nuevos_corte3: getTotalCorteNuevo(
          reporte.nuevos,
          dates,
          Number(user.ruta),
          2
        ),
        renovados_corte1: getTotalCorteRenovacion(
          reporte.renovaciones,
          dates,
          Number(user.ruta),
          0
        ),
        renovados_corte2: getTotalCorteRenovacion(
          reporte.renovaciones,
          dates,
          Number(user.ruta),
          1
        ),
        renovados_corte3: getTotalCorteRenovacion(
          reporte.renovaciones,
          dates,
          Number(user.ruta),
          2
        ),
      });
    });

    setRowDataNuevosRen(data);
  };

  const handleVerReporte = async (dates: string[]) => {
    setLoader(true);
    setAllDates(dates);
    const response = await gatCoteos(dates[0], dates[dates.length - 1]);
    const reporte: IReporteCoteo = response;
    const dates1 = dates.slice(0, 10);
    const data1 = setDatosReporte(reporte, dates1);
    setRowData1(data1);
    setColumnDefs1(
      generateColumnDefs(
        new Date(dates1[0]),
        new Date(dates1[dates1.length - 1]),
        1
      )
    );

    const dates2 = dates.slice(10, 20);
    const data2 = setDatosReporte(reporte, dates2);
    setRowData2(data2);
    setColumnDefs2(
      generateColumnDefs(
        new Date(dates2[0]),
        new Date(dates2[dates2.length - 1]),
        2
      )
    );

    const dates3 = dates.slice(20);
    const data3 = setDatosReporte(reporte, dates3);
    setRowData3(data3);
    setColumnDefs3(
      generateColumnDefs(
        new Date(dates3[0]),
        new Date(dates3[dates3.length - 1]),
        3
      )
    );

    const dcr = [
      dates1[dates1.length - 1],
      dates2[dates2.length - 1],
      dates3[dates3.length - 1],
    ];
    setDateColumnsRen(dcr);
    setRowDataRen(setDatosUtilidadRecaudo(reporte, dcr, 1));

    setDateColumnsRec(dcr);
    setRowDataRec(setDatosUtilidadRecaudo(reporte, dcr, 2));

    setNuevosRenovados(reporte, dcr);

    setLoader(false);
    setOpenModal(false);
  };

  const tabs = [
    {
      label: "Corte 1",
      content: (
        <Corte
          ref={gridRef1}
          rowData={rowData1}
          columnDefs={columnDefs1}
          height={height}
          width="100%"
        />
      ),
    },
    {
      label: "Corte 2",
      content: (
        <Corte
          ref={gridRef2}
          rowData={rowData2}
          columnDefs={columnDefs2}
          height={height}
          width="100%"
        />
      ),
    },
    {
      label: "Corte 3",
      content: (
        <Corte
          ref={gridRef3}
          rowData={rowData3}
          columnDefs={columnDefs3}
          height={height}
          width="100%"
        />
      ),
    },
    {
      label: "Utilidad",
      content: (
        <UtilidadRecaudo
          rowData={rowDataRen}
          dateColumns={dateColumnsRen}
          height={height}
        />
      ),
    },
    {
      label: "Recaudo",
      content: (
        <UtilidadRecaudo
          rowData={rowDataRec}
          dateColumns={dateColumnsRec}
          height={height}
        />
      ),
    },
    {
      label: "Nuevos y Renovados",
      content: (
        <NuevosRenovaciones
          height={height}
          rowData={rowDataNuevosRen}
        />
      ),
    },
  ];

  const GetFechasReporte = async () => {
    const response = await getFechasReporte();
    const data: IItemsCBox[] = response;
    _setDates(data);
  };

  function obtenerNombreMes(numeroMes: number): string {
    const fecha = new Date();
    fecha.setMonth(numeroMes);
    const nombreMes = fecha.toLocaleString("es-ES", { month: "long" });

    // Convertir la primera letra en mayúscula y el resto en minúscula
    return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
  }

  const exportarRuta = () => {
    const corte1: any[] = rowData1;
    const corte2: any[] = rowData2;
    const corte3: any[] = rowData3;
    exportarCoteos(
      corte1,
      corte2,
      corte3,
      rowDataRen,
      rowDataRec,
      rowDataNuevosRen,
      allDates
    );
  };

  useEffect(() => {
    if (!validarPermiso("Coteos")) {
      navigate("/permisos");
    } else {
      GetFechasReporte();
    }
  }, []);

  return (
    <>
      {openModal && (
        <Modal
          content={
            <VerReporte
              data={_dates}
              action={handleVerReporte}
              month={month}
              setMonth={setMonth}
            />
          }
          title={"Generar reporte de coteos"}
          size={"max-w-2xl"}
        />
      )}
      <div className="h-full w-full grid mt-4 border-l-4 border-sky-600">
        <div className="flex justify-between items-center p-2 bg-[#E5E5E7] border-sky-600 rounded-br">
          <div>
            Mes de consulta:{" "}
            <span className="text-sky-700 font-semibold">
              {obtenerNombreMes(month)}
            </span>
          </div>
          <div className="w-1/4 pl-2 flex justify-end">
            <div className="flex space-x-2">
              <IconButton
                //   disabled={disabled}
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                <Cog />
              </IconButton>

              <IconButton
                //   disabled={disabled}
                color="primary"
                onClick={() => exportarRuta()}
              >
                <Printer />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="border-l-4 bg-white border-sky-600">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
};
export default Main;
