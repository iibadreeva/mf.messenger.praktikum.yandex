import { METHOD, DEFAULT_REQUEST_OPTIONS, queryStringify, parseXHRResult } from "./actions.js";
export default class HTTP {
    constructor(host) {
        this.get = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.GET }));
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.POST }));
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.PUT }));
        };
        this.delete = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.DELETE }));
        };
        this.request = (path, options = { method: METHOD.GET }) => {
            const { method, headers, data } = options;
            const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
            let url = `${this.host}${path}`;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (method === METHOD.GET && data) {
                    url = url + queryStringify(data);
                }
                xhr.open(method, url);
                xhr.withCredentials = true;
                if (headers) {
                    Object.keys(headers).forEach(function (key) {
                        xhr.setRequestHeader(key, headers[key]);
                    });
                }
                xhr.onload = function () {
                    resolve(parseXHRResult(xhr));
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                xhr.timeout = timeout;
                if (method === METHOD.GET) {
                    xhr.send();
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
        this.host = host;
    }
}
//# sourceMappingURL=http.js.map