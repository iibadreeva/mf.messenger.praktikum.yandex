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
    btn: {
        text: 'К чату?',
        clName: 'error__btn',
        type: 'button',
        handleClick: () => {
            console.log('check authorisation before');
        }
    }
};
render(".container", new Page(context));
render(".js-btn", new Button(context.btn));
//# sourceMappingURL=404.js.map