import { isEqual } from '../utils/is_equal'
import render from "../utils/render";
import remove from "../utils/remove";

type routeProps = { rootQuery: string; protect?: boolean };

export class Route {
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
      remove(this._props.rootQuery, this._block);
      return;
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    // if (!this._block) {
    //   this._block = new this._blockClass();
    //   render(this._props.rootQuery, this._block);
    //   return;
    // }
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    return;
  }
}
