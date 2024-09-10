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
