import { routes } from "./data.js";
import { routesUser } from "./data.js";
import { CheckUserAPI } from "../../pages/profile/user_api.js";
export default class Router2 {
    constructor() {
        this.routes = routes;
        this.history = window.history;
        this.user = null;
    }
    setUser() {
        new CheckUserAPI().request()
            .then((res) => {
            if (!res.ok) {
                res.data = null;
            }
            return res;
        })
            .then(({ data }) => JSON.parse(data))
            .then((infoUser) => {
            this.user = infoUser;
            this.start();
        });
    }
    _onRoute(...urlSegments) {
        const matchedRoute = this._matchUrlToRoute(urlSegments);
        if (matchedRoute) {
            this.hide();
            matchedRoute.getTemplate();
        }
    }
    _routeListeners() {
        const app = document.body;
        app.addEventListener("click", (event) => {
            const element = event.target;
            if (element.classList.contains('js-route-link')) {
                event.preventDefault();
                let pathname = element.getAttribute('to') || '';
                if (pathname === 'back') {
                    this.back();
                }
                else if (pathname === 'forward') {
                    this.forward();
                }
                else {
                    const href = element.getAttribute('href');
                    if (href) {
                        pathname = href.slice(1);
                    }
                    this.history.pushState({}, '', pathname);
                    this._onRoute(pathname);
                }
            }
        });
    }
    _matchUrlToRoute(urlSegments) {
        const matchedRoute = this.routes.find((route) => {
            let routePathSegments = route.path.split('/').slice(1);
            if (routePathSegments.length !== urlSegments.length) {
                return false;
            }
            return routePathSegments
                .every((routePathSegment, i) => {
                const url = this._renderPage(routePathSegment, urlSegments[i]);
                return routePathSegment === url;
            });
        });
        return matchedRoute;
    }
    _renderPage(routePathSegment, urlSegments) {
        let url = urlSegments;
        if (this.user === null && '' === urlSegments) {
            url = "login";
        }
        else if ('' === urlSegments) {
            url = "chat";
        }
        else if (routePathSegment !== urlSegments) {
            url = "404";
        }
        return url;
    }
    start() {
        window.onpopstate = ((event) => {
            const pathnameSplit = event.currentTarget.location.pathname.split('/');
            const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
            this._onRoute(...pathSegments);
        }).bind(this);
        if (this.user !== null) {
            this.routes = routesUser;
        }
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
        this._onRoute(...pathSegments);
        this._routeListeners();
    }
    hide() {
        const routerOutletElement = document.querySelector('.container');
        if (routerOutletElement) {
            routerOutletElement.innerHTML = '';
        }
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
}
//# sourceMappingURL=route.js.map