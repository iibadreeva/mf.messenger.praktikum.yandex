export class BaseAPI {
    create(res) {
        if (this._res) {
            this._res = res;
        }
        throw new Error('Not implemented');
    }
    request() { throw new Error('Not implemented'); }
    update(res) {
        if (this._res) {
            this._res = res;
        }
        throw new Error('Not implemented');
    }
    delete() { throw new Error('Not implemented'); }
}
//# sourceMappingURL=base-api.js.map