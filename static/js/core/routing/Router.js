import { Route } from "./Route.js";
import { overviewHide } from "../utils/overview.js";
export default class Router {
    constructor(rootQuery) {
        this._rootQuery = '';
        this.history = window.history;
        this._defaultPath = '';
        this.isProtect = true;
        this.isStart = false;
        this._handleHashChange = () => {
            const path = window.location.pathname;
            this._onRoute(path);
        };
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
        window.addEventListener('hashchange', this._handleHashChange);
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    useDefault(pathname, block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery
        });
        this._defaultPath = pathname;
        this.isStart = true;
        this.routes.push(route);
        return this;
    }
    useProtect(pathname, block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
            protect: true,
        });
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.hash);
        }).bind(this);
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
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
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find((route) => {
            return route._pathname.match(pathname);
        });
    }
}
//# sourceMappingURL=Router.js.map