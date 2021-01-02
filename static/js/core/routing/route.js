import { isEqual } from "../utils/is_iqual/is_equal.js";
import render from "../utils/render.js";
class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    navigate(pathname) {
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
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render() {
        const app = document.querySelector(this._props.rootQuery);
        if (app) {
            app.innerHTML = '';
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
    }
}
export { Route };
//# sourceMappingURL=route.js.map