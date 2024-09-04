import { ICredito } from "./ICredito";

export interface IClientes {
  data: ICliente[];
  creditosActivos: number;
}


export interface ICliente {
  id: number;
  titular: string;
  cc_titular: number | null;
  neg_titular: string;
  fiador: string;
  cc_fiador: number | null;
  neg_fiador: string;
  dir_cobro: string;
  barrio_cobro: string;
  tel_cobro: string;
  dir_casa: string;
  barrio_casa: string;
  tel_casa: string;
  dir_fiador: string;
  barrio_fiador: string;
  tel_fiador: string;
  created_at: Date;
  updated_at: Date;
  estado: boolean;
  clientes_referencias: [],
  creditos: ICredito[]
}

export interface IErrorsCliente {
  titular: string;
  fiador: string;
  cc_fiador: string;
  cc_titular: string;
  neg_titular: string;
  neg_fiador: string;
  dir_cobro: string;
  barrio_cobro: string;
  tel_cobro: string;
  dir_casa: string;
  barrio_casa: string;
  tel_casa: string;
  dir_fiador: string;
  barrio_fiador: string;
  tel_fiador: string;
  created_at: string;
  updated_at: string;
  estado: string;
}