export interface IDataParametro {
  data: IParametro[];
}

export interface IParametro {
  id: number;
  nombre: string;
  descripcion: string;
  editable: boolean;
  icono: string;
  created_at: Date;
  updated_at: Date;
  parametros_detalles: IParametroDetalle[];
}

export interface IParametroDetalle {
  id: number;
  parametro_id: number;
  id_interno: number;
  valor: string;
  created_at: Date;
  updated_at: Date;
  estado: boolean;
}

export const ParametroDetalleVacio = {
  id: 0,
  parametro_id: 0,
  id_interno: 0,
  valor: "",
  created_at: new Date(),
  updated_at: new Date(),
  estado: true,
};

export interface IErrorsParametro {
  id_interno: number;
  valor: string;
}

export interface ICreateParametro {
  id_interno: number;
  parametro_id: number;
  valor: string;
}

export interface IPutParametros {
  cambios: IParametroDetalle[]
}