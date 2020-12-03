import Block from '../core/block.js';
import Button from "../components/button/index.js";
import { forma, render } from "../core/utils.js";
import Input from "../components/input/index.js";
class Page extends Block {
    constructor(props) {
        super("main", 'error', props);
    }
    render() {
        const { name, image, goBack } = this.props;
        const templ = `
        <main class="profile">
        <a href="${goBack}"  class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </a>
        <div class="profile__form js-btn">
          <div class="profile__heaed">
            <div class="profile__photo">
                <img class="profile__image" src="${image}">
            </div>
            <div class="profile__name">${name}</div>
          </div>
          <div class="profile__items js-form"></div>
        </div>
      </main>`;
        return templ;
    }
}
const context = {
    name: 'Инна',
    image: '',
    goBack: '/profile.html',
    formdata: {
        oldPassword: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Старый пароль',
                dataType: 'password_old',
                dataText: '',
                value: 'yandex.ru'
            }
        },
        password: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Пароль',
                dataType: 'password',
                dataText: '',
                value: 'inna@yandex.ru'
            }
        },
        passwordAgain: {
            type: 'profile',
            config: {
                type: 'password',
                placeholder: 'Пароль (еще раз)',
                dataType: 'password_again',
                dataText: 'Пароли не совпадают',
                value: 'inna@yandex.ru'
            }
        }
    },
    btn: {
        text: 'Сохранить',
        type: 'button',
        clName: 'profile__btn js-submit',
    }
};
const { formdata: { oldPassword, password, passwordAgain }, btn } = context;
const page = new Page(context);
render(".container", page);
render('.js-form', new Input(oldPassword, 'profile__item'));
render('.js-form', new Input(password, 'profile__item'));
render('.js-form', new Input(passwordAgain, 'profile__item'));
const button = new Button(btn);
render(".js-btn", button);
const form = document.getElementsByClassName('profile__form')[0];
if (form) {
    forma.listeners(form, true);
}
//# sourceMappingURL=profile_password.js.map