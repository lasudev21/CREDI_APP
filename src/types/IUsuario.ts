export interface IUsuarios {
    data: IUsuario[];
  }
  
  
  export interface IUsuario {
    id: number;
    nombres: string;
    apellidos: string;
    telefono1: number;
    telefono2?: number;
    login: boolean;
    username: string;
    password: string;
    ruta: string;
    created_at: Date;
    Updated_at: Date;
    email: string;
    rol: number;
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