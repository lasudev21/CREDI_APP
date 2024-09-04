export interface IErrorCallAPI {
  status: number;
  response: IResponse;
  message: string;
}

export interface IResponse {
  data: IError
}

export interface IError {
  Error: string;
}