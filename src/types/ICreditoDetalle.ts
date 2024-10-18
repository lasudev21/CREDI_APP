import { IUsuario } from "./IUsuario";

export interface ICreditoDetalle {
  id: number;
  credito_id: number;
  usuario_id: number;
  renovacion_id: number;
  abono: number;
  fecha_abono: Date;
  estado: boolean;
  created_at: Date;
  updated_at: Date;
  contar: number;
  user: IUsuario;
}
