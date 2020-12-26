import { routesI, routes } from "./data";
import { UserI } from "../../pages/profile/data";
import {routesUser} from "./data";

import {CheckUserAPI} from "../../pages/profile/user_api";

export default class Router2 {
  private history: History;
  private routes: routesI[]
  user: UserI | null;

  // constructor(private routes: routesI[]) {
  constructor() {
    this.routes = routes;
    this.history = window.history;
    this.user = null;
    // this.setUser();
    // console.log('setUser', this.user)
    // this.start();
  }
  setUser() {
    new CheckUserAPI().request()
      .then((res:any) => {
        if (!res.ok) {
          res.data = null;
        }
        return res;
      })
      .then(({data}: any) => JSON.parse(data))
      .then((infoUser: UserI | null) => {
        this.user = infoUser;
        this.start();
      })
  }

  _onRoute(...urlSegments: string[]) {
    const matchedRoute = this._matchUrlToRoute(urlSegments);

    if(matchedRoute) {
      this.hide();
      matchedRoute.getTemplate();
    }
  }

  _routeListeners() {
    // const app = document.querySelector('.container')!;
    const app = document.body;
    app.addEventListener("click", (event: Event) => {
      const element = <HTMLInputElement>event.target

      if (element.classList.contains('js-route-link')) {
        event.preventDefault();

        let pathname = element.getAttribute('to') || '';
        if (pathname === 'back') {
          this.back();
        } else if (pathname === 'forward') {
          this.forward();
        } else {
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

  _matchUrlToRoute(urlSegments: string | any[]) {
    const matchedRoute = this.routes.find((route: { path: string; }) => {
      let routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      return routePathSegments
        .every((routePathSegment, i) => {
          const url = this._renderPage(routePathSegment, urlSegments[i]);

          return routePathSegment === url
        });
    });

    return matchedRoute;
  }

  _renderPage(routePathSegment:string, urlSegments:string) {
    let url = urlSegments;

    if (this.user === null && '' === urlSegments) {
      url = "login";
    } else if('' === urlSegments) {
      url = "chat";
    } else if (routePathSegment !== urlSegments) {
      url = "404";
    }


    return url;
  }


  start(): void {
    window.onpopstate = ((event: Event) => {
      const pathnameSplit = (event.currentTarget as Document).location.pathname.split('/');
      const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

      this._onRoute(...pathSegments);
    }).bind(this);

    if(this.user !== null) {
      this.routes = routesUser;
    }

    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this._onRoute(...pathSegments);
    this._routeListeners()
  }

  hide(): void {
    const routerOutletElement = document.querySelector('.container');
    if(routerOutletElement) {
      routerOutletElement.innerHTML = '';
    }
  }

  go(pathname:string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }
}