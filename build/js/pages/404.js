import Block from '../core/block.js';
import Button from "../components/button/index.js";
import { Templator, render } from "../core/utils.js";
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
const context = {
    title: '404',
    description: 'Ой! Такой страницы нет на сайте :(',
    textBtn: 'К чату?',
    handleClick: () => {
        console.log('404');
    }
};
const page = new Page(context);
render(".container", page);
const button = new Button(context);
render(".js-btn", button);
//# sourceMappingURL=404.js.map