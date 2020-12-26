export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

export type TOptions = {
  method: METHOD;
  headers?: {[key: string]:string};
  data?: any;
  timeout?: number;
}
export const DEFAULT_REQUEST_OPTIONS = {
  timeout: 5000,
};

export type OptionsWithoutMethod = Omit<TOptions, 'method'>;

export interface RequestResult {
  ok: boolean;
  status: number;
  statusText: string;
  data: string;
  json: <T>() => T;
  headers: string;
}

export function queryStringify(data: any = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export function parseXHRResult(xhr: XMLHttpRequest): RequestResult {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.responseText,
    json: <T>() => JSON.parse(xhr.responseText) as T,
  };
}