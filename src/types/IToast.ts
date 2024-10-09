export enum TypeToastEnum {
  Error = "error",
  Susccess = "susccess",
  Warning = "warning",
  Info = "info",
  Question = "question",
}

export interface IToast {
  message: string;
  type: TypeToastEnum;
}
