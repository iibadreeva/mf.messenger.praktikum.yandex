import { isEqual } from "../utils/is_equal.js";
import render from "../utils/render.js";
import remove from "../utils/remove.js";
export class Route {
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
            remove(this._props.rootQuery, this._block);
            return;
        }
    }
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render() {
        this._block = new this._blockClass();
        render(this._props.rootQuery, this._block);
        return;
    }
}
//# sourceMappingURL=Route.js.map