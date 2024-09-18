import moment from "moment";
import { ICliente } from "./ICliente";
import { ICreditoDetalle } from "./ICreditoDetalle";
import { ICreditoRenovacion } from "./ICreditoRenovacion";
import { IUsuario } from "./IUsuario";

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
}

export interface ICrearCredito {
  Cliente: string;
  ClienteId: number;
  ModCuota: number | null;
  ModDias: number | null;
  ValorPrestamo: number | null;
  InicioCredito: string;
  RutaId: number;
  Observaciones: string;
  ObsDia: string;
  modalidad: number;
}

export interface IErrorsCrearCredito {
  Cliente: string;
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
  Cliente: "",
  ClienteId: 0,
  ModCuota: null,
  ModDias: null,
  ValorPrestamo: null,
  InicioCredito: moment(new Date()).format("YYYY-MM-DD"),
  RutaId: 0,
  Observaciones: "",
  ObsDia: "",
  modalidad: 1,
};

export interface IClienteCredito {
  data: ICliente[];
}
