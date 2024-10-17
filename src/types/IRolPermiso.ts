export interface IRolePermisoData {
  data: IRolePermiso[];
  permisos: IRolDetalle[];
}

export interface IRolePermiso {
  id: number;
  rol_id: number;
  pantalla: string;
  ver: boolean;
}

export interface IRolDetalle {
  id: number;
  rol_permiso_id: number;
  user_id: number;
  ver: boolean;
  editar: boolean;
  especial: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IPermiso {
  id_view: number;
  view: string;
  ver: boolean;
  editar: boolean;
  especial: boolean;
  idPermmision: number | null;
}
