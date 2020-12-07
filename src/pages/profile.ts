import Block from '../core/block.js';
import Avatar from '../components/avatar/index.js';
import {render} from '../core/utils.js';
import Input from '../components/input/index.js';

interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    disabled: string,
    value: string
  }
}
interface ILinks {
  name: string; url: string; className: string
}

interface IContext {
  avatar: {
    name: string,
    image: string
  },
  formdata: {
    email: IInput,
    login: IInput,
    firstName: IInput,
    lastName: IInput,
    phone: IInput,
  },
  links: ILinks[]
}

class Page extends Block {
  constructor(props: IContext) {
    super('main', 'error', props);
  }

  render() {
    const {links} = this.props;
    const templ = `
        <main class="profile">
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <div class="profile__form">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
          <div class="profile__items">
            ${Object.keys(links).map(function(key) {
    return `<div class="profile__item">
                        <a class="profile__label ${links[key].className}" href="${links[key].url}">${links[key].name}</a>
                     </div>`;
  }).join('')}
          </div>
        </div>
      </main>`;

    return templ;
  }
}

const context:IContext = {
  avatar: {
    name: 'Инна',
    image: 'images/static_cat.jpg'
  },
  formdata: {
    email: {
      type: 'profile',
      config: {
        type: 'email',
        placeholder: 'Почта',
        disabled: 'disabled',
        value: 'Inna@yandex.ru'
      }
    },
    login: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Логин',
        disabled: 'disabled',
        value: 'Inna'
      }
    },
    firstName: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Имя',
        disabled: 'disabled',
        value: 'Инна'
      }
    },
    lastName: {
      type: 'profile',
      config: {
        type: 'text',
        placeholder: 'Фамилия',
        disabled: 'disabled',
        value: 'Бадреева'
      }
    },
    phone: {
      type: 'profile',
      config: {
        type: 'tel',
        placeholder: 'Телефон',
        disabled: 'disabled',
        value: '+7(909)967-30-30'
      }
    }
  },
  links: [
    {
      name: 'Изменить данные',
      url: '/profile_change.html',
      className: 'profile__label_link'
    },
    {
      name: 'Изменить пароль',
      url: '/profile_password.html',
      className: 'profile__label_link'
    },
    {
      name: 'Выйти',
      url: '#',
      className: 'profile__label_exit'
    }
  ]
};
const {formdata: {email, login, firstName, lastName, phone}, avatar}: IContext = context;


render('.container', new Page(context));
render('.js-avatar', new Avatar(avatar));

render('.js-form', new Input(email, 'profile__item'));
render('.js-form', new Input(login, 'profile__item'));
render('.js-form', new Input(firstName, 'profile__item'));
render('.js-form', new Input(lastName, 'profile__item'));
render('.js-form', new Input(phone, 'profile__item'));
