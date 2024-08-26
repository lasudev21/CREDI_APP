export interface IUsuarios {
    data: IUsuario[];
  }
  
  
  export interface IUsuario {
    id: number;
    nombre: string;
    apellidos: string;
    telefono1: number;
    telefono2: number;
    login: boolean;
    username: string;
    ruta: string;
    created_at: Date;
    Updated_at: Date;
    email: string;
    rol: number;
  }