import { ICredito } from "./ICredito";
import { ICreditoRenovacion } from "./ICreditoRenovacion";
import { IDataFC } from "./IFlujoCaja";
import { IDataFU } from "./IFlujoUtilidades";
import { IItemsCBox } from "./IRuta";
import { IUsuario } from "./IUsuario";

export interface IReporteCoteo {
  data: IUsuario[];
  utilidades: IDataFU[];
  recaudos: IDataFC[];
  nuevos: ICredito[];
  renovaciones: ICreditoRenovacion[];
  rutas: IItemsCBox[];
}

export interface ApiResponse {
  cobrador: string;
  diarios: number;
  semanales: number;
  coteado: number;
  quedado: number;
  coteos: ICoteo[];
  [key: string]: string | number | ICoteo[];
}

export interface ApiResponseV1 {
  cobrador: string;
  corte1: number;
  corte2: number;
  corte3: number;
  // utilidades: IDataFU[];
  // ruta: number;
  // [key: string]: string | number | IDataFU[];
}

export interface ICoteo {
  id: number;
  fecha: Date;
  coteos_dia: number;
  id_ruta: number;
  id_usuario: number;
  created_at: Date;
  total_creditos_dia: number;
  total_creditos_sem: number;
}

export interface NuevosYRenovados {
  cobrador: string;
  nuevos_corte1: number;
  renovados_corte1: number;
  nuevos_corte2: number;
  renovados_corte2: number;
  nuevos_corte3: number;
  renovados_corte3: number;
}