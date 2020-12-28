import Block from "../../core/block.js";
import HeaderPhoto from "../../components/messenger/header-photo.js";
import Input from "../../components/input/index.js";
import Dialog from "../../components/messenger/dialog.js";
import Templator from "../../core/utils/templator.js";
import showHamburger from "../../core/utils/show_hamburger.js";
import { context } from "./data.js";
export class Chat extends Block {
    constructor() {
        const { avatar, search, dialogs } = context;
        super('div', 'messenger', {
            description: context.description,
            header: new HeaderPhoto(avatar, 'messenger__header').render(),
            search: new Input(search).render(),
            dialogs: new Dialog({ dialogs }, 'messenger__items').render(),
        });
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const hamburgerBtn = this.element.querySelectorAll('.js-hamburger') || [];
            showHamburger(hamburgerBtn);
        });
    }
    render() {
        const templ = `
          <main class="messenger__left">
            <div class="messenger__header">{{ header }}</div>
            <div class="messenger__search">{{ search }}</div>
            <div class="messenger__items">{{ dialogs }}</div>
          </main>
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
//# sourceMappingURL=messenger.js.map