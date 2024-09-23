export interface ICreditoRenovacion {
  id: number;
  credito_id: number;
  observaciones: string;
  excedente: number;
  estado: boolean;
  fecha: Date;
  created_at: Date;
  updated_at: Date;
  credito: Credito;
}

export interface Credito {
  id: number;
  ruta_id: number;
}
