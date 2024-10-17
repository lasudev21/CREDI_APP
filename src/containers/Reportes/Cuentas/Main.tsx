/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton } from "@mui/material";
import { Printer, Save, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../../../store/DashboardStore";
import { useCuentaStore } from "../../../store/CuentaStore";
import { getFechasReporte } from "../../../services/parametroService";
import { IItemsCBox } from "../../../types/IRuta";
import Modal from "../../../components/Common/Modal";
import VerReporte from "../../../components/Reportes/Cuentas/VerReporte";
import {
  getReporteCuentas,
  postReporteCuentas,
} from "../../../services/reporteService";
import {
  ICuentas,
  IReporteCuentasData,
  ISalidaCuentas,
} from "../../../types/IReporte";
import CierreCortes from "../../../components/Reportes/Cuentas/CierreCortes";
import Tabs from "../../../components/Common/Tab";
import CuentasSocios from "../../../components/Reportes/Cuentas/CuentasSocios";
import { exportarCuentas } from "../../../utils/pdfMakeExport";
import { TypeToastEnum } from "../../../types/IToast";
import { useNavigate } from "react-router-dom";

const Cuentas = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState<number>(0);
  const [activeTab, setActiveTab] = useState(0);
  const [contentModal, setContentModal] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string>("");
  const {
    isMobile,
    setLoader,
    openModal,
    setOpenModal,
    setErrorsToast,
    validarPermiso,
  } = useDashboardStore();
  const { year, setFechas, fechas, setList, reset, list, list1 } =
    useCuentaStore();

  const Fechas = async () => {
    setLoader(true);
    const response = await getFechasReporte();
    const data: IItemsCBox[] = response;
    setFechas(data);
    setLoader(false);
  };

  useEffect(() => {
    if (!validarPermiso("Cuentas")) {
      navigate("/permisos");
    } else {
      Fechas();
    }
    reset();
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - (isMobile ? 240 : 240);
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const AbrirModal = (tipo: string) => {
    switch (tipo) {
      case "buscarCuentas":
        setContentModal(
          <VerReporte
            data={fechas}
            action={handleVerReporteCuentas}
          />
        );
        setTitle("Consultar reporte");
        break;
    }
    setOpenModal(true);
  };

  const handleVerReporteCuentas = async (year: number) => {
    setLoader(true);
    const response = await getReporteCuentas(year);
    const data: IReporteCuentasData = response;
    setList(data, year);
    setLoader(false);
    setOpenModal(false);
  };

  const handleGuardarCuenta = async () => {
    setLoader(true);
    const data: ISalidaCuentas[] = [];
    list1.map((item: ICuentas) => {
      data.push({ anio: Number(year), mes: item.id, salidas: item.salidas });
    });
    const response = await postReporteCuentas(data);
    if (response) {
      setErrorsToast([
        {
          message: "Cambios guardados en el reporte",
          type: TypeToastEnum.Susccess,
        },
      ]);
    }
    setLoader(false);
  };

  const tabs = [
    {
      label: "CIERRES CORTES",
      content: <CierreCortes height={height} />,
    },
    {
      label: "ACOMULADO DE UTILIDADES",
      content: <CuentasSocios height={height} />,
    },
  ];

  return (
    <>
      {openModal && (
        <Modal
          content={contentModal}
          title={title}
          size={"max-w-2xl"}
        />
      )}
      <div>
        <div className="h-full w-full grid mt-4 border-l-4 border-sky-600">
          <div className="flex justify-between items-center p-2 bg-[#E5E5E7] border-sky-600 rounded-br">
            <div className="flex w-3/4 pr-2">
              <div className="flex flex-col mx-4">
                <p className="font-light">Fecha consulta</p>
                <div className="flex font-semibold">
                  <p className="font-semibold">{year}</p>
                  <Search
                    size={20}
                    onClick={() => AbrirModal("buscarCuentas")}
                    className="text-sky-600 hover:text-sky-800 ml-2 rounded transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/4 pl-2 flex justify-end">
              <div className="flex space-x-2">
                <IconButton
                  disabled={list.length > 0 ? false : true}
                  color="primary"
                  onClick={() => handleGuardarCuenta()}
                >
                  <Save />
                </IconButton>
                <IconButton
                  disabled={list.length > 0 ? false : true}
                  color="primary"
                  onClick={() => exportarCuentas(list, list1, Number(year))}
                >
                  <Printer />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Cuentas;
