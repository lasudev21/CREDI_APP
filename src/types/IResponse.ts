import { AxiosResponseHeaders } from "axios";

export interface IResponse {
  status: number;
  statusText: string;
  request: Request;
}

export interface Headers {
  "cache-control": AxiosResponseHeaders
  "content-type": string | undefined;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  baseURL: string;
  method: string;
  url: string;
  data: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Env {}

export interface Headers2 {
  Accept: string;
  "Content-Type": string;
  Authorization: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Request {}
