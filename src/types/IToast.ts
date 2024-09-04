export enum TypeToastEnum{
    Error = "error",
    Susccess = "susccess",
    Warning = "warning"
}

export interface IToast{
    message: string;
    type: TypeToastEnum;
}