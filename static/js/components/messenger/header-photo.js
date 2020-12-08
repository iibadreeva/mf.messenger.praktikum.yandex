import Block from '../../core/block.js';
import Templator from '../../core/utils/templator.js';
export default class HeaderPhoto extends Block {
    constructor(props, className) {
        super('header', className, props);
    }
    render() {
        const templ = `
            <div class="messenger__header__photo">
              <img class="messenger__header__image" src="{{ image }}">
            </div>
            <div class="messenger__header__hamburger js-hamburger" data-type="profile"><i class="fa fa-bars"></i></div>
            `;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=header-photo.js.map