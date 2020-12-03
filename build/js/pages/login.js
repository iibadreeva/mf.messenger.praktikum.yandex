import Block from '../core/block.js';
import Button from '../components/button/index.js';
import Input from '../components/input/index.js';
import { render, Templator, forma } from '../core/utils.js';
class Page extends Block {
    constructor(props) {
        super('main', 'container', props);
    }
    render() {
        const templ = `
        <div class="overview overview_active"></div>
        <div class="log-form">
          <div class="js-form">
            <span class="log-form__title">{{ title }}</span>
          </div>
          <div class="log-form__group-btn js-btn"></div>
        </div>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
const context = {
    title: 'Вход',
    formdata: {
        login: {
            type: 'lightForm',
            config: {
                type: 'text',
                placeholder: 'Логин',
                dataType: 'login',
                dataText: 'Ведите логин',
                value: ''
            }
        },
        password: {
            type: 'lightForm',
            config: {
                type: 'password',
                placeholder: 'Пароль',
                dataType: 'password',
                dataText: 'Ведите пароль',
                value: ''
            }
        },
    },
    link: {
        text: 'Регистрация',
        className: 'log-form__btn log-form__btn_gray',
        type: 'link',
        url: '/registration.html'
    },
    btn: {
        text: 'Авторизоваться',
        clName: 'log-form__btn js-submit',
        type: 'button',
    }
};
const { formdata: { login, password }, btn, link } = context;
const page = new Page(context);
render('.container', page);
render('.js-form', new Input(login, 'log-form__control'));
render('.js-form', new Input(password, 'log-form__control'));
render('.js-btn', new Button(btn));
render('.js-btn', new Button(link));
const form = document.getElementsByClassName('log-form')[0];
if (form) {
    forma.listeners(form, false);
}
//# sourceMappingURL=login.js.map