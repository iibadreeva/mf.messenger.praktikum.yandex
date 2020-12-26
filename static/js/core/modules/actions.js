export var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["POST"] = "POST";
    METHOD["PUT"] = "PUT";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
;
export const DEFAULT_REQUEST_OPTIONS = {
    timeout: 5000,
};
export function queryStringify(data = {}) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}
export function parseXHRResult(xhr) {
    return {
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: xhr.responseText,
        json: () => JSON.parse(xhr.responseText),
    };
}
//# sourceMappingURL=actions.js.map