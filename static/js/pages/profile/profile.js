import Block from "../../core/block.js";
import Avatar from "../../components/avatar/index.js";
import Input from "../../components/input/index.js";
import { context } from "./data.js";
import { UserAPI } from "../../modules/http/user-api.js";
import router from "../../router.js";
import { host } from "../../modules/actions.js";
export class Profile extends Block {
    constructor() {
        let { formdata: { email, login, first_name, second_name, phone }, avatar } = context;
        super('main', '', {
            links: context.links,
            avatar: new Avatar(avatar).render(),
            email: new Input(email).render(),
            login: new Input(login).render(),
            first_name: new Input(first_name).render(),
            second_name: new Input(second_name).render(),
            phone: new Input(phone).render(),
        });
        this.getData();
    }
    getData() {
        let { formdata: { email, login, first_name, second_name, phone }, avatar } = context;
        new UserAPI()
            .request()
            .then(res => JSON.parse(res.data))
            .then(data => {
            email.config.value = data.email;
            login.config.value = data.login;
            first_name.config.value = data.first_name;
            second_name.config.value = data.second_name;
            phone.config.value = data.phone;
            if (data.avatar) {
                avatar.name = data.first_name;
                avatar.image = `${host}${data.avatar}`;
            }
            this.setProps({
                email: new Input(email).render(),
                login: new Input(login).render(),
                first_name: new Input(first_name).render(),
                second_name: new Input(second_name).render(),
                phone: new Input(phone).render(),
                avatar: new Avatar(avatar).render(),
            });
        });
    }
    goChange() {
        router.go('/change');
    }
    goPassword() {
        router.go('/password');
    }
    goChat() {
        router.go('/chat');
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            console.log('componentDidMount eventBus');
            const change = this.element.querySelector('.js-change');
            const password = this.element.querySelector('.js-password');
            const back = this.element.querySelector('.profile__left');
            if (change) {
                change.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.goChange();
                });
            }
            if (password) {
                password.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.goPassword();
                });
            }
            if (back) {
                console.log('back', back);
                back.addEventListener('click', () => {
                    console.log('click');
                    this.goChat();
                });
            }
        });
    }
    render() {
        const { links, avatar } = this.props;
        const { email, login, first_name, second_name, phone } = this.props;
        const templ = `
        <main class="profile">
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <div class="profile__form">
          <div class="js-avatar">
            ${avatar}
          </div>
          <div class="profile__items js-form">
            <div class="profile__item">${email}</div>
            <div class="profile__item">${login}</div>
            <div class="profile__item">${first_name}</div>
            <div class="profile__item">${second_name}</div>
            <div class="profile__item">${phone}</div>
          </div>
          <div class="profile__items">
            ${links.map(item => {
            return `<div class="profile__item">
                        <a class="profile__label ${item.className}" href="${item.url}">${item.name}</a>
                     </div>`;
        }).join('')}
          </div>
        </div>
      </main>`;
        return templ;
    }
}
//# sourceMappingURL=profile.js.map