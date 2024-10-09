import { IItemsCBox } from "./IRuta";
import { IUsuario } from "./IUsuario";

export interface INominaData {
  cobradores: IItemsCBox[];
  fechas: IItemsCBox[];
}

export interface INominaCobradorData {
  data: INominaCobrador[];
}

export interface IPostCobrador {
  data: IUsuario;
}

export interface INominaCobrador {
  id: number;
  ahorro: number;
  cobrador_id: number;
  cobrador: IUsuario;
  nomina_id: number;
  dias_laborados: number;
  eps: number;
  nomina: INomina;
  salario: number;
  vales: IVale[];
}

export interface IVale {
  id: number;
  nomina_cobrador_id: number;
  valor: number | null;
  descripcion: string;
  fecha: Date;
}

export interface IErrorsVale {
  id: string;
  nomina_cobrador_id: string;
  valor: string;
  descripcion: string;
  fecha: string;
}

export const ValeVacio = {
  id: 0,
  nomina_cobrador_id: 0,
  valor: null,
  descripcion: "",
  fecha: new Date(),
};

export interface INomina {
  id: number;
  anio: number;
  mes: number;
  created_at: Date;
  updated_at: Date;
}

export const NominaVacio = {
  id: 0,
  anio: 0,
  mes: 0,
  created_at: new Date(),
  updated_at: new Date(),
};
