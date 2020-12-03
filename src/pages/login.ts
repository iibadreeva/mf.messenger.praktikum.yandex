import Block from '../core/block.js';
import Button from '../components/button/index.js';
import Input from '../components/input/index.js';
import {render, Templator, forma} from '../core/utils.js';

interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    dataType: string,
    dataText: string,
    value: string
  }
}

interface IContext {
  title: string,
  formdata: {
    login: IInput,
    password: IInput
  },
  link: object,
  btn: object
}

class Page extends Block {
  constructor(props: IContext) {
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

    const tmpl:any = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

const context:IContext = {
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
const {formdata: {login, password}, btn, link}: any = context;

const page = new Page(context);
render('.container', page);

render('.js-form', new Input(login, 'log-form__control'));
render('.js-form', new Input(password, 'log-form__control'));

render('.js-btn', new Button(btn));
render('.js-btn', new Button(link));

const form = <HTMLDivElement>document.getElementsByClassName('log-form')[0];

if (form) {
  forma.listeners(form, false);
}