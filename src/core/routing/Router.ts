import { Route} from './Route';

export default class Router {
  routes: any;
  _currentRoute: any;
  _rootQuery: string = '';
  static __instance: any;
  private history: History = window.history
  // private _defaultPath: string = '';
  // public isProtect: boolean = true;

  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    // this.history = window.history;
    this._currentRoute = null;
    if (rootQuery) {
      this._rootQuery = rootQuery;
    }
    // this._defaultPath;
    // this.isProtect = true;

    Router.__instance = this;

    window.addEventListener('hashchange', this._handleHashChange);
  }

  _handleHashChange = (): void => {
    const path = window.location.pathname;

    this._onRoute(path);
  };

  use(pathname: string, block: Function): this {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  // useDefault(pathname: string, block: Function): this {
  //   const route = new Route(pathname, block, {
  //     rootQuery: this._rootQuery,
  //   });
  //   // this._defaultPath = pathname;
  //   this.routes.push(route);
  //   return this;
  // }
  //
  // useProtect(pathname: string, block: Function): this {
  //   const route = new Route(pathname, block, {
  //     rootQuery: this._rootQuery,
  //     protect: true,
  //   });
  //   this.routes.push(route);
  //   return this;
  // }

  start(): void {
    window.onpopstate = ((event: PopStateEvent): void => {
      this._onRoute((<Window>event.currentTarget).location.hash);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/404');
      return;
    }
    // console.log(route._props.protect , this.isProtect)
    // if (route._props.protect && this.isProtect) {
    // if (route._props.protect && this.isProtect) {
    //   this.go(this._defaultPath);
    //   return;
    // }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
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

  getRoute(pathname: string): any {
    return this.routes.find((route: { _pathname: string; }) => {
      return route._pathname.match(pathname);
    });
  }
}
