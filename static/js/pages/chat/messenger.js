import Block from "../../core/block.js";
import HeaderPhoto from "../../components/messenger/header-photo.js";
import Input from "../../components/input/index.js";
import Dialog from "../../components/messenger/dialog.js";
import Templator from "../../core/utils/templator.js";
import showHamburger from "../../core/utils/show_hamburger.js";
import { context } from "./data.js";
import { overviewHide } from "../../core/utils/overview.js";
import { UserAPI } from "../../modules/http/user-api.js";
import { host } from "../../modules/actions.js";
import { ChatApi } from "./chat-api.js";
import { escape } from "../../core/utils/escape.js";
import router from "../../router.js";
export class Chat extends Block {
    constructor() {
        const { avatar, search } = context;
        super('div', 'messenger', {
            description: context.description,
            header: new HeaderPhoto(avatar).render(),
            search: new Input(search).render(),
            dialogs: new Dialog({}).render(),
        });
        this.getData();
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const hamburgerBtn = this.element.querySelectorAll('.js-hamburger') || [];
            this.modal = showHamburger(hamburgerBtn, true);
        });
        this.listeners();
    }
    getData() {
        const { avatar } = context;
        new UserAPI()
            .request()
            .then(res => JSON.parse(res.data))
            .then(data => {
            if (data.avatar) {
                avatar.image = `${host}${data.avatar}`;
            }
            this.setProps({
                header: new HeaderPhoto(avatar).render(),
            });
        });
        new ChatApi()
            .request()
            .then(res => JSON.parse(res.data))
            .then(data => {
            this.dialogs = { dialogs: data };
            this.setData();
        });
    }
    setData() {
        this.setProps({
            dialogs: new Dialog(this.dialogs).render(),
        });
    }
    createDialog(value) {
        new ChatApi()
            .createChat({
            "title": value
        })
            .then(res => {
            const { status, data } = res;
            if (status === 200) {
                let res = JSON.parse(data);
                const dialog = {
                    avatar: null,
                    id: res.id,
                    title: value
                };
                const { dialogs } = this.dialogs;
                const result = [
                    ...dialogs,
                    dialog
                ];
                this.dialogs.dialogs = result;
                this.setData();
                if (this.modal) {
                    this.modal.hide();
                    overviewHide();
                }
            }
            else if (status >= 500) {
                router.go('/500');
            }
            else {
                alert('Произошла ошибка');
            }
        });
    }
    removeDialog(id) {
        new ChatApi()
            .deleteChat({
            "chatId": id
        })
            .then(res => {
            const { status } = res;
            if (status === 200) {
                const { dialogs } = this.dialogs;
                const index = dialogs.findIndex((item) => item.id === id);
                const result = [
                    ...dialogs.slice(0, index),
                    ...dialogs.slice(index + 1)
                ];
                this.dialogs.dialogs = result;
                this.setData();
                if (this.modal) {
                    this.modal.hide();
                    overviewHide();
                }
            }
            else if (status >= 500) {
                router.go('/500');
            }
            else {
                alert('Произошла ошибка');
            }
        });
    }
    listeners() {
        const body = document.body;
        body.addEventListener('click', (e) => {
            const that = e.target;
            const value = escape(document.querySelector('.modal__value'));
            if (that.classList.contains('js-btn-create-chat') && value !== '') {
                this.createDialog(value);
            }
            if (that.classList.contains('js-btn-remove-chat') && this.modal) {
                const id = +that.dataset.id;
                this.removeDialog(id);
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
            if (that.classList.contains('js-btn-close-modal') && this.modal) {
                this.modal.hide();
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
      </aside>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=messenger.js.map