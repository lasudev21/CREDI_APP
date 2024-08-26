// export interface IClientes {
//   data: ICredito[];
// }


export interface ICredito {
  id: number;
  orden: number;
  obs_dia: string;
  cliente_id: number;
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
  inicio_credito: Date;
  congelar: boolean;
}
