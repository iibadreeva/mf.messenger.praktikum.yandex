import { isEqual } from '../../utils/is_iqual/is_equal';
import render from '../../utils/render';

type routeProps = { rootQuery: string; protect?: boolean };

interface IRoute {
  _pathname: string;
  _blockClass: any;
  _block: Function | null;
  _props: routeProps;

  match(pathname: string): boolean;
  render(): void;
}

class Route implements IRoute {
  _pathname: string;
  _blockClass: any;
  _block: any;
  _props: routeProps;
  constructor(pathname: string, view: Function, props: routeProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    const app = document.querySelector(this._props.rootQuery);
    if (app) {
      app.innerHTML = '';

      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }
  }
}

export { Route, IRoute };
