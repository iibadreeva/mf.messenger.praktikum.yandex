import { Route, IRoute} from './route';
import {overviewHide} from "../utils/overview";

interface IRouter {
  _rootQuery: string;
  routes: IRoute[];
  history: History;
  _currentRoute: IRoute | null;
  __instance: IRouter | undefined;
  isProtect: boolean;
  _defaultPath: string;
  use(pathname: string, block: Function): this;
  useDefault(pathname: string, block: Function): this;
  useProtect(pathname: string, block: Function): this;
  start(): void;
  _onRoute(pathname: string): void;
  go(pathname: string): void;
  back(): void;
  forward(): void;
  getRoute(pathname: string): IRoute | void;
}

export default class Router implements IRouter {
  _currentRoute: IRoute | null = null;
  _rootQuery: string = '';
  __instance: IRouter | undefined;
  history: History = window.history
  _defaultPath: string = '';
  isProtect: boolean = true;
  isStart: boolean = false;
  routes: IRoute[] = [];

  static __instance: Router;
  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this._currentRoute = null;
    if (rootQuery) {
      this._rootQuery = rootQuery;
    }
    this._defaultPath;
    this.isProtect = true;
    this.isStart = false;

    Router.__instance = this;
  }

  use(pathname: string, block: Function): this {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    if(this.routes) {
      this.routes.push(route);
    }
    return this;
  }

  useDefault(pathname: string, block: Function): this {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery
    });
    this._defaultPath = pathname;
    this.isStart = true;
    if(this.routes) {
      this.routes.push(route);
    }
    return this;
  }

  useProtect(pathname: string, block: Function): this {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      protect: true,
    });
    if(this.routes) {
      this.routes.push(route);
    }
    return this;
  }

  start(): void {
    window.onpopstate = ((event: PopStateEvent): void => {
      this._onRoute((<Window>event.currentTarget).location.pathname);
    });

    history.pushState( '', '', window.location.pathname );
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    overviewHide();
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/404');
      return;
    }

    if (pathname === '/' && pathname !== this._defaultPath) {
      this.go(this._defaultPath);
      return;
    }

    if (route._props.protect && this.isProtect) {
      this.go(this._defaultPath);
      return;
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): IRoute | void {
    return this.routes.find((route: { _pathname: string; }) => {
      return route._pathname.match(pathname);
    });
  }
}
