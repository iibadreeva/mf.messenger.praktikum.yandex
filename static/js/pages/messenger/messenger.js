import Block from '../../core/block.js';
import HeaderPhoto from '../../components/messenger/header-photo.js';
import Input from '../../components/input/index.js';
import Dialog from '../../components/messenger/dialog.js';
import render from '../../core/utils/render.js';
import Templator from '../../core/utils/templator.js';
import showHamburger from '../../core/utils/show_hamburger.js';
import { context } from './data.js';
class Page extends Block {
    constructor(props) {
        super('div', 'messenger', props);
    }
    render() {
        const templ = `
          <main class="messenger__left"></main>
          <aside class="messenger__right">
            <header class="messenger__header messenger__header_right"></header>
            <div class="messenger__content messenger__content_center">
              <p class="messenger__text">{{ description }}</p>
            </div>
          </aside>
        `;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
const { avatar, search, dialogs } = context;
render('.container', new Page(context));
render('.messenger__left', new HeaderPhoto(avatar, 'messenger__header'));
render('.messenger__left', new Input(search, 'messenger__search'));
render('.messenger__left', new Dialog({ dialogs }, 'messenger__items'));
showHamburger();
//# sourceMappingURL=messenger.js.map