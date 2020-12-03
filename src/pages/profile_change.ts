import Block from '../core/block.js';
import Button from "../components/button/index.js";
import {forma, render} from "../core/utils.js";
import Input from "../components/input/index.js";

interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    dataType: string,
    dataSize?: string,
    value: string
  }
}
type btnType = {
  text: string,
  clName: string,
  type: string,
  handleClick?: Function
}

interface IContext {
  name: string,
  image: string,
  goBack: string,
  formdata: {
    email: IInput,
    login: IInput,
    firstName: IInput,
    lastName: IInput,
    phone: IInput,
  },
  btn: btnType
}

class Page extends Block {
  constructor(props: IContext) {
    super("main", 'error', props);
  }

  render() {
    const {name, image, goBack} = this.props;
    const templ = `
        <main class="profile">
        <a href="${goBack}"  class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </a>
        <div class="profile__form js-btn">
          <div class="profile__heaed">
            <div class="profile__photo">
                <img class="profile__image" src="${image}">
                <div class="profile__placeholder">
                  <div class="profile__placeholder__text">Поменять
                    <div>аватар</div>
                  </div>
                </div>
            </div>
            <div class="profile__name">${name}</div>
          </div>
          <div class="profile__items js-form"></div>
        </div>
      </main>`;

    return templ;
  }
}

const context:IContext = {
  name: 'Инна',
  image: 'images/static_cat.jpg',
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

const {formdata: {email, login, firstName, lastName, phone}, btn}: any = context;


const page = new Page(context);
render(".container", page);

render('.js-form', new Input(email, 'profile__item'));
render('.js-form', new Input(login, 'profile__item'));
render('.js-form', new Input(firstName, 'profile__item'));
render('.js-form', new Input(lastName, 'profile__item'));
render('.js-form', new Input(phone, 'profile__item'));

const button = new Button(btn);
render(".js-btn", button);

const form = <HTMLDivElement>document.getElementsByClassName('profile__form')[0];

if (form) {
  forma.listeners(form, true);
}