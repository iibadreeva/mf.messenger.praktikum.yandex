import Block from '../../core/block.js';
import Button from "../../components/button/index.js";
import render from '../../core/utils/render.js';
import Templator from '../../core/utils/templator.js';
import { context } from './data.js';
class Page extends Block {
    constructor(props) {
        super("main", 'error', props);
    }
    render() {
        const templ = `
        <h1 class="error__title">{{ title }}</h1>
        <div class="error__footer js-btn">
          <p class="error__text">{{ description }}</p>
        </div>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
render(".container", new Page(context));
render(".js-btn", new Button(context.btn));
//# sourceMappingURL=404.js.map