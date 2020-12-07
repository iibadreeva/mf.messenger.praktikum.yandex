import Block from '../core/block.js';
import Button from '../components/button/index.js';
import Avatar from '../components/avatar/index.js';
import { modalCheck, render, showHamburger, Templator } from '../core/utils.js';
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
        image: 'images/static_cat.jpg',
        change: true
    },
    goBack: '/profile.html',
    formdata: {
        email: {
            type: 'profile',
            config: {
                type: 'email',
                placeholder: 'Почта',
                dataType: 'email',
                value: 'Inna@yandex.ru'
            }
        },
        login: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Логин',
                dataType: 'login',
                dataSize: '3',
                value: 'Inna'
            }
        },
        firstName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Имя',
                dataType: 'text',
                value: 'Инна'
            }
        },
        lastName: {
            type: 'profile',
            config: {
                type: 'text',
                placeholder: 'Фамилия',
                dataType: 'text',
                value: 'Бадреева'
            }
        },
        phone: {
            type: 'profile',
            config: {
                type: 'tel',
                placeholder: 'Телефон',
                dataType: 'phone',
                value: '+7(909)967-30-30'
            }
        }
    },
    btn: {
        text: 'Сохранить',
        type: 'button',
        clName: 'profile__btn js-submit',
    }
};
const { formdata: { email, login, firstName, lastName, phone }, btn, avatar } = context;
render('.container', new Page(context));
render('.js-form', new Input(email, 'profile__item'));
render('.js-form', new Input(login, 'profile__item'));
render('.js-form', new Input(firstName, 'profile__item'));
render('.js-form', new Input(lastName, 'profile__item'));
render('.js-form', new Input(phone, 'profile__item'));
render('.js-btn', new Button(btn));
render('.js-avatar', new Avatar(avatar));
modalCheck();
showHamburger();
//# sourceMappingURL=profile_change.js.map