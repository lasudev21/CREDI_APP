import { ICoteo } from "./IReporte";

export interface IUsuarios {
  data: IUsuario[];
}

export interface IUsuario {
  id: number;
  nombres: string;
  apellidos: string;
  telefono1: number | null;
  telefono2?: number | null;
  login: boolean;
  username: string;
  password: string;
  ruta: string;
  created_at: Date;
  Updated_at: Date;
  email: string;
  rol: number;
  coteos: ICoteo[];
}

export interface IErrorsUsuario {
  nombres: string;
  apellidos: string;
  telefono1: string;
  telefono2: string;
  username: string;
  password: string;
  ruta: string;
  email: string;
  rol: number;
}

export const UsuarioVacio = {
  id: 0,
  nombres: "",
  apellidos: "",
  telefono1: null,
  telefono2: null,
  login: false,
  username: "",
  password: "",
  ruta: "",
  created_at: new Date(),
  Updated_at: new Date(),
  email: "",
  rol: 0,
};
