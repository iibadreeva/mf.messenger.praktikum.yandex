import Block from '../core/block.js';
import Button from '../components/button/index.js';
import Avatar from '../components/avatar/index.js';
import { modalCheck, render, Templator } from '../core/utils.js';
import Input from '../components/input/index.js';
class Page extends Block {
    constructor(props) {
        super('main', 'error', props);
    }
    render() {
        const templ = `
        <main class="profile">
        <a href="{{ goBack }}"  class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </a>
        <form class="profile__form js-btn">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
        </form>
      </main>`;
        const tmpl = new Templator(templ);
        return tmpl.compile(this.props);
    }
}
const context = {
    avatar: {
        name: 'Инна',
        image: 'images/static_cat.jpg'
    },
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
const { formdata: { oldPassword, password, passwordAgain }, btn, avatar } = context;
render('.container', new Page(context));
render('.js-form', new Input(oldPassword, 'profile__item'));
render('.js-form', new Input(password, 'profile__item'));
render('.js-form', new Input(passwordAgain, 'profile__item'));
render('.js-btn', new Button(btn));
render('.js-avatar', new Avatar(avatar));
modalCheck();
//# sourceMappingURL=profile_password.js.map