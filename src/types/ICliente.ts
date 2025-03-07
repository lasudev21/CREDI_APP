import { IClienteReferencia } from "./IClienteReferencia";
import { ICredito } from "./ICredito";

export interface IClientes {
  data: ICliente[];
  creditosActivos: number;
  total: number;
}

export interface ICliente {
  id: number;
  titular: string;
  cc_titular: number;
  neg_titular: string;
  fiador: string;
  cc_fiador: number;
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
  clientes_referencias: IClienteReferencia[];
  creditos: ICredito[];
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

export const ClienteVacio = {
  id: 0,
  titular: "",
  cc_titular: 0,
  neg_titular: "",
  fiador: "",
  cc_fiador: 0,
  neg_fiador: "",
  dir_cobro: "",
  barrio_cobro: "",
  tel_cobro: "",
  dir_casa: "",
  barrio_casa: "",
  tel_casa: "",
  dir_fiador: "",
  barrio_fiador: "",
  tel_fiador: "",
  created_at: new Date(),
  updated_at: new Date(),
  estado: true,
  clientes_referencias: [],
  creditos: [],
};
