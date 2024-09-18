export interface IDashboard {
  clientesNew: IDataValue[];
  cantNew: number;
  clientesRen: IDataValue[];
  cantRen: number;
  totalCoteo: number;
  coteosUsuarios: ICoteosUsuario[];
}

export interface IDataValue {
  label: string;
  value: number;
}

export interface ICoteosUsuario {
  id_usuario: number;
  total_coteos: string;
  user: UserCoteo;
}

export interface UserCoteo {
  id: number;
  nombres: string;
  apellidos: string;
}
