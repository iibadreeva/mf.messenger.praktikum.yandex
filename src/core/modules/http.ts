import {
  METHOD,
  IOptions,
  DEFAULT_REQUEST_OPTIONS,
  OptionsWithoutMethod,
  RequestResult
} from './actions';
import {ObjectKeyStringType} from "../types";

export default class HTTP {
  host:string;
  constructor(host: string) {
    this.host = host;
  }

  parseXHRResult(xhr: XMLHttpRequest): RequestResult {
    return {
      ok: xhr.status >= 200 && xhr.status < 300,
      status: xhr.status,
      statusText: xhr.statusText,
      headers: xhr.getAllResponseHeaders(),
      data: xhr.responseText,
      json: <T>() => JSON.parse(xhr.responseText) as T,
    };
  }

  getDeepParams(keyName: string, object: ObjectKeyStringType): string {
    return Object.keys(object).reduce((result, key, index, arr) => {
      const obj = object[key];
      let params = `${keyName}[${key}]=${obj}`;

      if (typeof obj === 'object') {
        params = this.getDeepParams(`${keyName}[${key}]`, obj);
      }
      return `${result}${params}${index < arr.length - 1 ? '&' : ''}`;
    }, '');
  }

  queryStringify(data: ObjectKeyStringType) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      const obj = data[key];
      let param = `${key}=${obj}`;

      if (typeof obj === 'object') {
        param = this.getDeepParams(key, obj);
      }
      return `${result}${param}${index < keys.length - 1 ? '&' : ''}`;
    }, '');
  }

  get = (url: string, options: OptionsWithoutMethod = {}): Promise<RequestResult> => {
    return this.request(url,{ ...options, method: METHOD.GET });
  };

  post = (url: string, options: IOptions = {}): Promise<RequestResult> => {
    return this.request(url,{ ...options, method: METHOD.POST });
  };
  put = (url: string, options: IOptions = {}): Promise<RequestResult> => {
    return this.request(url,{...options, method: METHOD.PUT});
  };
  delete = (url: string, options: IOptions = {}): Promise<RequestResult> => {
    return this.request(url,{...options, method: METHOD.DELETE});
  };

  request = (path: string, options: IOptions = { method: METHOD.GET}): Promise<RequestResult> => {
    const {method, headers, data} = options;
    const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
    let url = `${this.host}${path}`;

    return new Promise<RequestResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if( method === METHOD.GET && data) {
        url = url + this.queryStringify(data)
      }
      if(method) {
        xhr.open(method, url);
      }
      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach(function (key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = () => {
        resolve(this.parseXHRResult(xhr));
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHOD.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}