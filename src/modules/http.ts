import {
  METHOD,
  TOptions,
  DEFAULT_REQUEST_OPTIONS,
  OptionsWithoutMethod,
  RequestResult,
  queryStringify,
  parseXHRResult
} from './actions';

export default class HTTP {
  host:string;
  constructor(host: string) {
    this.host = host;
  }

  get = (url: string, options: OptionsWithoutMethod = {}): Promise<RequestResult> => {
    return this.request(url, {...options, method: METHOD.GET});
  };

  post = (url: string, options = {}): Promise<RequestResult> => {
    return this.request(url, {...options, method: METHOD.POST});
  };
  put = (url: string, options = {}): Promise<RequestResult> => {
    return this.request(url, {...options, method: METHOD.PUT});
  };
  delete = (url: string, options = {}): Promise<RequestResult> => {
    return this.request(url, {...options, method: METHOD.DELETE});
  };

  request = (path: string, options: TOptions = { method: METHOD.GET}): Promise<RequestResult> => {
    const {method, headers, data} = options;
    const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
    let url = `${this.host}${path}`

    return new Promise<RequestResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if( method === METHOD.GET && data) {
        url = url + queryStringify(data)
      }
      xhr.open(method, url);
      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach(function (key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function() {
        resolve(parseXHRResult(xhr));
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