import Block from "../../core/block.js";
import render from "../../core/utils/render.js";
import Templator from "../../core/utils/templator.js";
import { context } from "../404/data.js";
class Page extends Block {
    constructor(props) {
        super("main", '', props);
    }
    render() {
        const templ = `
        <h1>Test 2</h1>
        <ul>
          <li><a class="js-route-link" href="/">Home</a></li>
          <li><a class="js-route-link" href="/test1">test1</a></li>
          <li><a class="js-route-link" href="/test2">test2</a></li>
          <li><a class="js-route-link" href="/test3/1">test3</a></li>
          <li><button class="js-route-link" to="back">back</button></li>
          <li><button class="js-route-link" to="forward">forward</button></li>
        </ul>
    `;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
export const test2 = () => {
    render(".container", new Page(context));
};
//# sourceMappingURL=test_2.js.map