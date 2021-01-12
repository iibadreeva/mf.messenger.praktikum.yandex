export const host = 'https://ya-praktikum.tech';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type IOptions = {
  method?: METHOD;
  headers?: { [key: string]: string };
  data?: any;
  timeout?: number;
};

export const DEFAULT_REQUEST_OPTIONS = {
  timeout: 5000,
};

export type OptionsWithoutMethod = Omit<IOptions, 'method'>;

export interface RequestResult {
  ok: boolean;
  status: number;
  statusText: string;
  data: string;
  json: <T>() => T;
  headers: string;
}
