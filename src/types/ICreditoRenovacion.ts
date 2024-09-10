export interface ICreditoRenovacion {
    id: number,
    credito_id: number,
    observaciones: string,
    excedente: number,
    estado: boolean,
    fecha: Date,
    created_at: Date,
    updated_at: Date
}