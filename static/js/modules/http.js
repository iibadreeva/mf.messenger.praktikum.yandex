import { METHOD, DEFAULT_REQUEST_OPTIONS } from "./actions.js";
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
            const that = this;
            return new Promise((resolve, reject) => {
                if (!method) {
                    reject('Need to use method');
                    return;
                }
                const xhr = new XMLHttpRequest();
                if (method === METHOD.GET && data) {
                    url = url + this.queryStringify(data);
                }
                xhr.open(method, url);
                xhr.withCredentials = true;
                if (headers) {
                    Object.keys(headers).forEach(function (key) {
                        xhr.setRequestHeader(key, headers[key]);
                    });
                }
                xhr.onload = function () {
                    resolve(that.parseXHRResult(xhr));
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                xhr.timeout = timeout;
                xhr.ontimeout = reject;
                if (method === METHOD.GET) {
                    xhr.send();
                }
                else {
                    xhr.send(data);
                }
            });
        };
        this.host = host;
        this.request = this.request.bind(this);
    }
    parseXHRResult(xhr) {
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: () => JSON.parse(xhr.responseText),
        };
    }
    queryStringify(data = {}) {
        if (typeof data !== 'object') {
            throw new Error('Data must be object');
        }
        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
    }
}
//# sourceMappingURL=http.js.map