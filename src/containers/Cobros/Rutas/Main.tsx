/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { PlusCircleIcon, Printer, Repeat, Save, Search } from "lucide-react";
import { useRutaStore } from "../../../store/RutaStore";
import { getdatosRutas } from "../../../services/parametroService";
import { IPeriodos } from "../../../types/IRuta";
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
import {
  ICredito,
  IRenovacion,
  IRenovacionInmediata,
} from "../../../types/ICredito";
import GuardarCoteos from "../../../components/Cobros/Rutas/GuardarCoteos";
import MenuTabla from "../../../components/Cobros/Rutas/MenuTabla";
import { saveRenovacionInmediata } from "../../../services/creditoService";
import Swal from "sweetalert2";
import RenovarCredito from "../../../components/Cobros/Rutas/RenovarCredito";
import DetallesCredito from "../../../components/Cobros/Rutas/DetallesCredito";
import ExportarRuta from "../../../components/Cobros/Rutas/ExportarRuta";
import { useNavigate } from "react-router-dom";
import SpeedDial from "../../../components/Common/SpeedDial";
import EditarCredito from "../../../components/Cobros/Rutas/EditarCredito";
import { TypeToastEnum } from "../../../types/IToast";

function currencyFormatter(params: ValueFormatterParams) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return "";
  }
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const Rutas = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const {
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
    clearNuevos,
    clearPeriodos,
    nuevos,
  } = useRutaStore((state) => state);
  const [height, setHeight] = useState<number>(0);
  const [sizeDrawer, setSizeDrawer] = useState<string>("");
  const [contentDrawer, setContentDrawer] = useState<React.ReactNode>(null);
  const [titleDrawer, setTitleDrawer] = useState<string>("");
  const [accionDrawer, setAccionDrawer] = useState(
    () => () => setOpenModal(false)
  );
  const [size, setSize] = useState<string>("");
  const [contentModal, setContentModal] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string>("");
  const {
    dias,
    toggleDrawer,
    showDrawer,
    setLoader,
    openModal,
    setOpenModal,
    validarPermiso,
    isMobile,
    setErrorsToast,
  } = useDashboardStore();

  const Periodos = async () => {
    setLoader(true);
    const response = await getdatosRutas();
    const data: IPeriodos = response;
    setPeriodos(data);
    setLoader(false);
  };

  const modalAction = (tipo: string, id: number = 0) => {
    let [entrada, salida, reversion, utilidad, coteos] = [0, 0, 0, 0, 0];

    const data: ICredito[] = gridRef.current.getGridData();

    switch (tipo) {
      case "addCliente":
        setContentModal(
          <AgregarClientes
            accion={drawerAccion}
            rutaId={rutaId}
          />
        );
        setTitle("Gestionar créditos");
        setSize("max-w-7xl");
        break;
      case "seeRutas":
        setContentModal(<VerRutas rutas={rutas} />);
        setTitle("Seleccione la ruta que desea consultar...");
        setSize("max-w-2xl");
        break;
      case "saveCoteos":
        data.map((x: ICredito) => {
          entrada =
            typeof x.cuota === "number" ? entrada + Number(x.cuota) : entrada;
          if (x.renovacion) {
            coteos++;
            salida = salida + x.renovacion.monto;
            if (x.renovacion.editable)
              utilidad = utilidad + x.renovacion.utilidad * 1000;
            else utilidad = utilidad + (x.valor_total - x.valor_prestamo);
          } else {
            if (x.nuevo) {
              salida = salida + x.valor_prestamo / 1000;
            } else coteos = coteos + getCoteoCuota(x);

            if (x.reversar_cuota) {
              salida = salida + x.valor_ultimo_pago / 1000;
              reversion = reversion + x.valor_ultimo_pago / 1000;
            }

            if (x.modificado) {
              if (x.valor_prestamo > x.estado_credito_actual.valor_prestamo) {
                salida =
                  salida +
                  (x.valor_prestamo / 1000 -
                    x.estado_credito_actual.valor_prestamo / 1000);
              } else if (
                x.valor_prestamo < x.estado_credito_actual.valor_prestamo
              ) {
                entrada =
                  x.estado_credito_actual.valor_prestamo / 1000 -
                  x.valor_prestamo / 1000;
              }
            }
          }
        });

        entrada = entrada * 1000;
        salida = salida * 1000;
        reversion = reversion * 1000;

        if (nuevos > 0) salida = salida + nuevos;

        setContentModal(
          <GuardarCoteos
            flujoCaja={{ entrada, salida, utilidad, coteos, reversion }}
            dataCoteos={data}
          />
        );
        setTitle("");
        setSize("max-w-2xl");
        break;
      case "editRenovacion": {
        const _dataRow = data.find((x) => x.id === id);
        const renovacion: IRenovacion = {
          cuota: Number(_dataRow?.mod_cuota) / 1000,
          dias: Number(_dataRow?.mod_dias),
          editable: true,
          modalidad: Number(_dataRow?.modalidad),
          monto: 0,
          observaciones: _dataRow?.observaciones ?? "",
          utilidad: 0,
          valor: Number(_dataRow?.valor_prestamo) / 1000,
          saldo: Number(_dataRow?.saldo) / 1000,
        };
        renovacion.monto = renovacion.valor - renovacion.saldo;
        renovacion.utilidad =
          renovacion.dias * renovacion.cuota - renovacion.valor;

        setContentModal(
          <RenovarCredito
            row={renovacion}
            id={id}
            actionRenovacionEditable={actionRenovacionEditable}
          />
        );
        setTitle("Renovar crédito");
        setSize("max-w-2xl");
        break;
      }
      case "seeDetallesCredito": {
        const _dataRow = data.find((x) => x.id === id);
        setContentModal(
          <DetallesCredito
            creditos_detalles={_dataRow?.creditos_detalles ?? []}
            creditos_renovaciones={_dataRow?.creditos_renovaciones ?? []}
            cliente={_dataRow?.cliente ?? ClienteVacio}
            data={_dataRow}
            actionActualizarObservaciones={handleActualizarObservaciones}
          />
        );
        setTitle("Detalles del crédito");
        setSize("max-w-7xl");
        break;
      }
      case "exportRuta":
        setContentModal(<ExportarRuta data={data} />);
        setTitle("Exportar ruta");
        setSize("max-w-2xl");
        break;
      case "editCredito": {
        const row = data.find((x) => x.id === id) as ICredito;
        setContentModal(
          <EditarCredito
            data={row}
            action={handleModificarCredito}
          />
        );
        setTitle("Modificar crédito actual");
        setSize("max-w-2xl");
        break;
      }
    }
    setOpenModal(true);
  };

  const drawerAccion = async (tipo: string) => {
    switch (tipo) {
      case "enrutar":
        setContentDrawer(<DnDRutas />);
        setSizeDrawer(isMobile ? "w-full" : "w-2/5");
        setTitleDrawer("Enrutar clientes");
        break;
      case "nuevoCliente":
        setContentDrawer(<Setting cliente={ClienteVacio} />);
        setSizeDrawer(isMobile ? "w-full" : "w-3/5");
        setTitleDrawer("Agregar cliente");
        setOpenModal(false);
        setAccionDrawer(() => () => setOpenModal(true));
        break;

      default:
        break;
    }
    toggleDrawer(true);
  };

  const getCoteoCuota = (x: ICredito) => {
    let coteo = 0;
    const rest = (Number(x.cuota) * 1000) / x.mod_cuota;
    if (Number(x.cuota) >= 5) {
      if (Number(x.cuota) * 1000 < x.mod_cuota) coteo = 1;
      else coteo = Math.floor(rest);
    } else coteo = 0;

    return coteo;
  };

  const handleRenovacionInmediata = (id: number) => {
    Swal.fire({
      title: "Renovar crédito",
      html: `<div> 
            <p> Realmente desea renovar este crédito? </p>
           </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.value) {
        const response = await saveRenovacionInmediata(id);
        const result: IRenovacionInmediata = response;
        if (result) {
          const data: ICredito[] = gridRef.current.getGridData();
          const index = data.findIndex((x) => x.id === id);
          gridRef.current.setCellValue(index, "cuota", "RN");
          const row = data[index];
          const renovacion: IRenovacion = {
            observaciones: "RENOVACION AUTOMATICA",
            monto: (row.valor_prestamo - row.saldo) / 1000,
            modalidad: row.modalidad,
            cuota: row.mod_cuota / 1000,
            dias: row.mod_dias,
            valor: row.valor_prestamo / 1000,
            editable: false,
            utilidad: 0,
            saldo: 0,
          };
          gridRef.current.setCellValue(index, "renovacion", renovacion);
          const diasSemana = ["D", "L", "MA", "MI", "J", "V", "S"];
          if (data[index].modalidad === 2) {
            const t = diasSemana[new Date().getDay()];
            gridRef.current.setCellValue(index, "obs_dia", `S(${t})`);
          }
        }
      }
    });
  };

  const handleRenovacionEditable = async (id: number) => {
    const response = await saveRenovacionInmediata(id);
    const result: IRenovacionInmediata = response;
    if (result) {
      modalAction("editRenovacion", id);
    }
  };

  const handleCancelarRen = async (id: number) => {
    const data: ICredito[] = gridRef.current.getGridData();
    const index = data.findIndex((x) => x.id === id);
    gridRef.current.setCellValue(index, "cuota", "");
    gridRef.current.setCellValue(index, "renovacion", null);
  };

  const handleCancelarEliminacion = (id: number) => {
    Swal.fire({
      title: "Retirar crédito",
      html: `<div> 
          <p> Realmente desea cancelar la eliminación del crédito de la ruta? </p>
         </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero reversar la eliminación",
    }).then(async (result) => {
      if (result.value) {
        const data: ICredito[] = gridRef.current.getGridData();
        const index = data.findIndex((x) => x.id === id);
        gridRef.current.setCellValue(index, "delete", false);
        gridRef.current.setCellValue(index, "cuota", "");
      }
    });
  };

  const actionRenovacionEditable = (renovacion: IRenovacion, id: number) => {
    const diasSemana = ["D", "L", "MA", "MI", "J", "V", "S"];
    const data: ICredito[] = gridRef.current.getGridData();
    const index = data.findIndex((x) => x.id === id);
    gridRef.current.setCellValue(index, "renovacion", renovacion);
    gridRef.current.setCellValue(index, "cuota", "RN");
    if (data[index].modalidad === 2) {
      const t = diasSemana[new Date().getDay()];
      gridRef.current.setCellValue(index, "obs_dia", `S(${t})`);
    }
  };

  const handleEliminarCredito = (id: number) => {
    Swal.fire({
      title: "Retirar crédito",
      html: `<div> 
          <p> Realmente desea retirar este crédito de la ruta? </p>
         </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, lo quiero retirar",
    }).then(async (result) => {
      if (result.value) {
        const data: ICredito[] = gridRef.current.getGridData();
        const index = data.findIndex((x) => x.id === id);
        gridRef.current.setCellValue(index, "delete", true);
        gridRef.current.setCellValue(index, "cuota", "DEL");
      }
    });
  };

  const handleActualizarObservaciones = (id: number, valor: string) => {
    const data: ICredito[] = gridRef.current.getGridData();
    const index = data.findIndex((x) => x.id === id);
    gridRef.current.setCellValue(index, "observaciones", valor);
  };

  const handleReversarCuota = (id: number) => {
    const data: ICredito[] = gridRef.current.getGridData();
    const index = data.findIndex((x) => x.id === id);
    Swal.fire({
      title: "Retirar crédito",
      html: `<div> 
          <p> Realmente desea reversar la ultima cuota del cliente ${data[index].cliente.titular}? </p>
         </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, lo quiero reversar",
    }).then(async (result) => {
      if (result.value) {
        gridRef.current.setCellValue(index, "reversar_cuota", true);
      }
    });
  };

  const handleModificarCredito = (credito: ICredito) => {
    // modalAction("editCredito", id);
    const data: ICredito[] = gridRef.current.getGridData();
    const index = data.findIndex((x) => x.id === credito.id);
    if (!data[index].nuevo) {
      gridRef.current.setCellValue(index, "modificado", true);
      gridRef.current.setCellValue(index, "mod_dias", String(credito.mod_dias));
      gridRef.current.setCellValue(index, "mod_cuota", credito.mod_cuota);
      gridRef.current.setCellValue(
        index,
        "valor_prestamo",
        credito.valor_prestamo
      );
      gridRef.current.setCellValue(
        index,
        "valor_total",
        credito.mod_cuota * credito.mod_dias
      );
      gridRef.current.setCellValue(
        index,
        "observaciones",
        credito.observaciones
      );
    }
    setOpenModal(false);
  };

  const changeMora = (event: any) => {
    if (typeof event.newValue === "number")
      event.node.setDataValue("update_mora", true);
    else event.node.setDataValue("mora", event.oldValue);
  };

  const icons = [
    <IconButton
      key={"btn[0][0]"}
      disabled={disabled}
      color="primary"
      onClick={() => modalAction("addCliente")}
      title="Agregar cliente a la ruta"
    >
      <PlusCircleIcon />
    </IconButton>,
    <IconButton
      key={"btn[0][1]"}
      disabled={disabled}
      color="primary"
      onClick={() => drawerAccion("enrutar")}
      title="Enrutar"
    >
      <Repeat />
    </IconButton>,
    <IconButton
      key={"btn[0][2]"}
      disabled={disabled}
      color="primary"
      onClick={() => modalAction("saveCoteos")}
      title="Guardar ruta"
    >
      <Save />
    </IconButton>,
    <IconButton
      key={"btn[0][3]"}
      disabled={disabled}
      color="primary"
      onClick={() => modalAction("exportRuta")}
      title="Exportar"
    >
      <Printer />
    </IconButton>,
  ];

  useEffect(() => {
    setOpenModal(false);
    toggleDrawer(false);
    setLoader(false);
    setRutaId(0);
    setDisable(true);
    clearNuevos();
    clearPeriodos();
    setData({
      cartera: 0,
      cobrador: UsuarioVacio,
      data: [],
    });

    if (!validarPermiso("Rutas")) {
      navigate("/permisos");
    } else {
      Periodos();
    }

    const handleResize = () => {
      const calculatedHeight = window.innerHeight - (isMobile ? 210 : 180);
      setHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "", // Nueva columna de acciones
      field: "id",
      width: 50,
      pinned: "left",
      cellRenderer: (params: any) => (
        <MenuTabla
          data={params.data}
          actionRenInmediata={handleRenovacionInmediata}
          actionEliminarCredito={handleEliminarCredito}
          actionCancelarRen={handleCancelarRen}
          actionRenEditable={handleRenovacionEditable}
          actionDetallesCredito={modalAction}
          actionCancelarEliminacion={handleCancelarEliminacion}
          actionReversarCuota={handleReversarCuota}
          actionModificarCredito={modalAction}
        />
      ),
    },
    { field: "orden", headerName: "Ord", pinned: "left", width: 70 },
    {
      field: "obs_dia",
      headerName: "Día",
      pinned: "left",
      width: 80,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["", ...dias.map((dia) => dia.label)],
      },
    },
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
      width: 90,
      valueParser: (params) => {
        let response = params.oldValue;
        const newValue = Number(params.newValue);
        if (!isNaN(newValue)) {
          if (newValue * 1000 <= params.data.saldo) response = newValue;
          else {
            setErrorsToast([
              {
                message: "No puede digitar un valor mayor al saldo",
                type: TypeToastEnum.Warning,
              },
            ]);
          }
        }
        return response;
      },
      valueFormatter: (params: ValueFormatterParams) => {
        return params.value !== null && params.value !== undefined
          ? params.value.toString()
          : "";
      },
      cellStyle: (params) => {
        switch (true) {
          case params.value === "RN":
          case params.value === "DEL":
            return { backgroundColor: "#DAD8D8", color: "white" };
          case params.value === "NEW":
            return { backgroundColor: "#caf7c3", color: "white" };
          default:
            return { backgroundColor: "#f0f8ff", color: "default" };
        }
      },
    },
    {
      field: "mora",
      headerName: "Mora",
      pinned: "left",
      editable: true,
      cellClass: "ag-cell-center",
      width: 80,
      onCellValueChanged: changeMora,
      cellStyle: (params) => {
        switch (true) {
          case params.value >= 5 && params.value <= 9:
            return { backgroundColor: "#FBF462", color: "black" };
          case params.value >= 10 && params.value <= 19:
            return { backgroundColor: "#F1775C", color: "black" };
          case params.value >= 20:
            return { backgroundColor: "#A25EEA", color: "black" };
          default:
            return { backgroundColor: "", color: "black" };
        }
      },
    },
    { field: "cuotas_pagas", headerName: "PAG", width: 90 },
    {
      field: "valor_prestamo",
      headerName: "Prestamo",
      width: 120,
      type: "currency",
      valueFormatter: currencyFormatter,
    },
    {
      field: "mod_cuota",
      headerName: "Cuota",
      width: 100,
      type: "currency",
      valueFormatter: currencyFormatter,
    },
    { field: "mod_dias", headerName: "Días", width: 90 },
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
    {
      field: "renovacion",
      headerName: "Renovación",
      width: 50,
      hide: true,
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 50,
      hide: true,
    },
    {
      field: "update_mora",
      headerName: "Actualizar mora",
      width: 50,
      editable: true,
      hide: true,
    },
    {
      field: "reversar_cuota",
      headerName: "Reversar Cuota",
      width: 50,
      editable: true,
      hide: true,
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      width: 50,
      editable: true,
      hide: true,
    },
    {
      field: "modificado",
      headerName: "Modificado",
      width: 50,
      editable: true,
      hide: true,
    },
  ]);

  return (
    <>
      {showDrawer && (
        <Drawer
          size={sizeDrawer}
          title={titleDrawer}
          content={contentDrawer}
          accion={accionDrawer}
        />
      )}
      <div className="h-full w-full grid mt-4 border-l-4 rounded-l border-sky-600">
        <div className="flex justify-between items-center p-2 bg-[#E5E5E7] border-b-2 border-sky-600 rounded-br">
          {/* Información de la Ruta, Cartera y Cobrador */}
          <div className="flex w-3/4 pr-2">
            {/* Sección de Ruta */}
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

            {/* Sección de Cartera */}
            <div className="flex flex-col mx-4">
              <p className="font-light">Cartera</p>
              <p className="font-semibold">{NumberFormat(cartera)}</p>
            </div>

            {/* Sección de Cobrador */}
            <div className="flex flex-col mx-4">
              <p className="font-light">Cobrador</p>
              <p className="font-semibold">
                {cobrador && `${cobrador.nombres} ${cobrador.apellidos}`}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          {!isMobile && (
            <div className="w-1/4 pl-2 flex justify-end">
              <div className="flex space-x-2">
                {icons.map((icon) => {
                  return icon;
                })}
              </div>
            </div>
          )}

          {isMobile && <SpeedDial buttons={icons} />}
        </div>

        <div className="border">
          <div style={{ height: "100%" }}>
            <TableAGReact
              ref={gridRef}
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
