import { isEqual } from '../utils/is_equal'
import render from "../utils/render";

type routeProps = { rootQuery: string; protect?: boolean };
// type blockConstructor = {
//   tagName?: string,
//   props?: { [key: string]: string | boolean }
// }


class Route {
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

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    const app = document.querySelector(this._props.rootQuery);
    if(app) {
      app.innerHTML = '';

      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }
  }
}

export { Route };
