import moment from "moment";
import { ClienteVacio, ICliente } from "./ICliente";
import { ICreditoDetalle } from "./ICreditoDetalle";
import { IUsuario } from "./IUsuario";
import { ICreditoRenovacion } from "./ICreditoRenovacion";

export interface ICreditoData {
  cobrador: IUsuario;
  cartera: number;
  data: ICredito[];
}

export interface ICredito {
  id: number;
  orden: number;
  obs_dia: string;
  cliente_id: number;
  cliente: ICliente;
  valor_total: number;
  ruta_id: number;
  mora: number;
  cuotas_pagas: number;
  valor_prestamo: number;
  mod_cuota: number;
  mod_dias: number;
  observaciones: string;
  modalidad: number;
  activo: boolean;
  eliminado: boolean;
  inicio_credito: string;
  congelar: boolean;
  valor_ultimo_pago: number;
  fecha_ultimo_pago: string | null;
  creditos_detalles: ICreditoDetalle[];
  creditos_renovaciones: ICreditoRenovacion[];
  saldo: number;
  cuota: number | string;
  renovacion: IRenovacion | null;
  delete: boolean;
  update_mora: boolean;
  nuevo: boolean;
  reversar_cuota: boolean;
  modificado: boolean;
  estado_credito_actual: IEstadoCreditoActual;
}

export interface IEstadoCreditoActual {
  mod_cuota: number;
  mod_dias: number;
  valor_prestamo: number;
}

export const IEstadoCreditoActualVacio = {
  mod_cuota: 0,
  mod_dias: 0,
  valor_prestamo: 0,
};

export interface IErrorsCredito {
  id: string;
  orden: string;
  obs_dia: string;
  cliente_id: string;
  cliente: ICliente;
  valor_total: string;
  ruta_id: string;
  mora: string;
  cuotas_pagas: string;
  valor_prestamo: string;
  mod_cuota: string;
  mod_dias: string;
  observaciones: string;
  modalidad: string;
  activo: boolean;
  eliminado: boolean;
  inicio_credito: string;
  valor_ultimo_pago: string;
  fecha_ultimo_pago: string;
  saldo: string;
  cuota: string;
}

export interface IRenovacion {
  monto: number;
  editable: boolean;
  utilidad: number;
  observaciones: string;
  modalidad: number;
  dias: number;
  cuota: number;
  valor: number;
  saldo: number;
}

export const IRenovacionVacio = {
  monto: 0,
  editable: false,
  utilidad: 0,
  observaciones: "",
  modalidad: 1,
  dias: 0,
  cuota: 0,
  valor: 0,
  saldo: 0,
};

export interface IErrosRenovacion {
  monto: string;
  editable: string;
  utilidad: string;
  observaciones: string;
  modalidad: string;
  dias: string;
  cuota: string;
  valor: string;
  saldo: string;
}

export interface IFlujoCajaRuta {
  entrada: number;
  salida: number;
  utilidad: number;
  coteos: number;
  reversion: number;
}

export interface IEnrutarCredito {
  id: number;
  orden: number;
  newPos: number | null;
  cliente: ICliente;
}

export interface ICreditoHistorialCliente {
  Activo: boolean;
  Id: number;
  InicioCredito: Date;
  Modalidad: number;
  ModCuota: number;
  ModDias: string;
  ObsDia: null;
  RutaId: number;
  ValorPrestamo: number;
  Finalizacion: Date;
  Observaciones: string;
  DetallesCredito: ICreditoDetalle[];
}

export interface ICrearCredito {
  Cliente: ICliente;
  ClienteText: string;
  ClienteId: number;
  ModCuota: number | null;
  ModDias: number | null;
  ValorPrestamo: number | null;
  InicioCredito: string;
  RutaId: number;
  Observaciones: string;
  ObsDia: string;
  modalidad: number;
  Orden: number;
}

export interface IErrorsCrearCredito {
  Cliente: string;
  ClienteText: string;
  ClienteId: string;
  ModCuota: string;
  ModDias: string;
  ValorPrestamo: string;
  InicioCredito: string;
  RutaId: string;
  Observaciones: string;
  ObsDia: string;
  modalidad: string;
}

export const CrearCreditoVacio = {
  Cliente: ClienteVacio,
  ClienteText: "",
  ClienteId: 0,
  ModCuota: null,
  ModDias: null,
  ValorPrestamo: null,
  InicioCredito: moment(new Date()).format("YYYY-MM-DD"),
  RutaId: 0,
  Observaciones: "",
  ObsDia: "",
  modalidad: 1,
  Orden: 0,
};

export interface IClienteCredito {
  data: ICliente[];
}

export interface IRenovacionInmediata {
  data: boolean;
}
