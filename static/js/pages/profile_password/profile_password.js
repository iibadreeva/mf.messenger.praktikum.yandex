import Block from "../../core/block.js";
import Button from "../../components/button/index.js";
import Avatar from "../../components/avatar/index.js";
import Templator from "../../core/utils/templator.js";
import Input from "../../components/input/index.js";
import { context } from "./data.js";
import { UserAPI } from "../../modules/http/user-api.js";
import { host } from "../../modules/actions.js";
import router from "../../router.js";
import Modal from "../../components/modal/index.js";
import render from "../../core/utils/render.js";
import { overviewHide } from "../../core/utils/overview.js";
import { forma } from "../../core/utils/form.js";
import { ChangePasswordApi } from "./change-password-api.js";
export class ProfilePassword extends Block {
    constructor() {
        const { formdata: { oldPassword, newPassword, passwordAgain }, btn, avatar } = context;
        super('main', 'profile', {
            avatar: new Avatar(avatar).render(),
            oldPassword: new Input(oldPassword).render(),
            newPassword: new Input(newPassword).render(),
            passwordAgain: new Input(passwordAgain).render(),
            button: new Button(btn).render(),
        });
        this.getData();
    }
    componentDidMount() {
        const popub = this.pupub();
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const form = this.element.querySelector('.profile__form');
            const back = this.element.querySelector('.profile__left');
            if (form) {
                this.checkForm(form, popub);
            }
            if (back) {
                back.addEventListener('click', this.goBack);
            }
        });
    }
    getData() {
        new UserAPI()
            .request()
            .then(res => JSON.parse(res.data))
            .then(data => {
            let { avatar } = context;
            if (data.avatar) {
                avatar.image = `${host}${data.avatar}`;
            }
            avatar.name = data.first_name;
            this.setProps({
                avatar: new Avatar(avatar).render(),
            });
        });
    }
    pupub() {
        const { modal } = context;
        const popub = new Modal(modal);
        popub.hide();
        render('.container', popub);
        const btnModal = document.querySelector('.js-modal-btn');
        if (btnModal) {
            btnModal.addEventListener('click', () => {
                popub.hide();
                overviewHide();
            });
        }
        return popub;
    }
    checkForm(form, popub) {
        forma.listeners(form);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputs = form.querySelectorAll('input');
            const data = forma.send(inputs, popub);
            if (data !== undefined && data !== null) {
                console.log('data', data);
                this.updatePassword(data);
            }
        });
    }
    updatePassword(data) {
        new ChangePasswordApi()
            .update(data)
            .then(res => {
            const { status, data } = res;
            if (status === 200) {
                alert('Данные успешно заменены');
            }
            else if (status >= 500) {
                router.go('/500');
            }
            else {
                let reason = data || 'Не правильный пароль';
                alert(reason);
            }
        });
    }
    goBack() {
        router.go('/profile');
    }
    render() {
        const { avatar, button, oldPassword, newPassword, passwordAgain } = this.props;
        const templ = `
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <form class="profile__form js-btn">
          <div class="js-avatar">${avatar}</div>
          <div class="profile__items js-form">
            <div class="profile__item">${oldPassword}</div>
            <div class="profile__item">${newPassword}</div>
            <div class="profile__item">${passwordAgain}</div>
          </div>
          ${button}
        </form>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
//# sourceMappingURL=profile_password.js.map