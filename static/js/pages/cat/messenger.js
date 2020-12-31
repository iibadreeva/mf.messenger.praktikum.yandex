import Block from "../../core/block.js";
import HeaderPhoto from "../../components/messenger/header-photo.js";
import Input from "../../components/input/index.js";
import Dialog from "../../components/messenger/dialog.js";
import Templator from "../../core/utils/templator.js";
import showHamburger from "../../core/utils/show_hamburger.js";
import { context } from "./data.js";
import { overviewHide } from "../../core/utils/overview.js";
export class Chat extends Block {
    constructor() {
        const { avatar, search } = context;
        super('div', 'messenger', {
            description: context.description,
            header: new HeaderPhoto(avatar, 'messenger__header').render(),
            search: new Input(search).render(),
            dialogs: new Dialog({}, 'messenger__items').render(),
        });
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const hamburgerBtn = this.element.querySelectorAll('.js-hamburger') || [];
            const modal = showHamburger(hamburgerBtn, true);
            this.listeners(modal);
        });
    }
    listeners(modal) {
        const body = document.body;
        body.addEventListener('click', (e) => {
            const that = e.target;
            if (that.classList.contains('js-btn-create-chat')) {
                console.log('создаем чат', modal);
                modal.hide();
                overviewHide();
            }
            if (that.classList.contains('js-btn-remove-chat')) {
                console.log('удаляем чат', modal);
                modal.hide();
                overviewHide();
            }
            if (that.classList.contains('js-btn-add-user')) {
                console.log('добавляем пользователя в чат', modal);
                modal.hide();
                overviewHide();
            }
            if (that.classList.contains('js-btn-remove-user')) {
                console.log('удаляем пользователя из чата', modal);
                modal.hide();
                overviewHide();
            }
            if (that.classList.contains('js-btn-close-modal')) {
                modal.hide();
                overviewHide();
            }
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