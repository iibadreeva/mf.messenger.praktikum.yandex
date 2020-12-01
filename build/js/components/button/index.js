import Block from '../../core/block.js';
import { Templator } from '../../core/utils.js';
export default class Button extends Block {
    constructor(props) {
        super('div', '', props);
    }
    render() {
        const templ = `<button onclick="{{ handleClick }}" class="error__btn">{{ textBtn }}</button>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=index.js.map