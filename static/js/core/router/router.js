import Route from "./route";
import { routes } from "./data";
export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = routes;
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        console.log('route', route);
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render(route, pathname);
    }
    onClick(event) {
        event.preventDefault();
        const target = event.target;
        const href = target.getAttribute('href');
        if (href) {
            this.go(href);
        }
    }
    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}
//# sourceMappingURL=router.js.map