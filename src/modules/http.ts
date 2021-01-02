import {
  METHOD,
  IOptions,
  DEFAULT_REQUEST_OPTIONS,
  OptionsWithoutMethod,
  RequestResult
} from './actions';

export default class HTTP {
  host:string;
  constructor(host: string) {
    this.host = host;
    this.request = this.request.bind(this);
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

  queryStringify(data: any = {}) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
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
    const that = this;

    return new Promise<RequestResult>((resolve, reject) => {
      if (!method) {
        reject('Need to use method');
        return;
      }
      const xhr = new XMLHttpRequest();
      if( method === METHOD.GET && data) {
        url = url + this.queryStringify(data)
      }
      xhr.open(method, url);
      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach(function (key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function() {
        resolve(that.parseXHRResult(xhr));
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