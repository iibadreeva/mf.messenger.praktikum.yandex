export class BaseAPI {
  private _res: object | undefined;
  create(res: object) {
    if(this._res) {
      this._res = res;
    }
    throw new Error('Not implemented');
  }

  request() { throw new Error('Not implemented'); }

  update(res: object) {
    if(this._res) {
      this._res = res;
    }
    throw new Error('Not implemented');
  }

  delete() { throw new Error('Not implemented'); }
}