import Block from '../core/block.js';
import Button from '../components/button/index.js';
import Input from '../components/input/index.js';
import {render, Templator, forma, overviewShow} from '../core/utils.js';

interface IInput {
  type: string,
  config: {
    type: string,
    placeholder: string,
    dataType: string,
    dataText: string,
    dataSize?: string,
    value: string
  }
}

interface IBtn {
  text: string,
  clName: string,
  type: string,
  url?: string
}

interface IContext {
  title: string,
  formdata: {
    login: IInput,
    password: IInput
  },
  link: IBtn,
  btn: IBtn
}

class Page extends Block {
  constructor(props: IContext) {
    super('main', 'container', props);
  }

  render() {
    const templ = `
        <form class="log-form js-form">
          <div class="js-form-group">
            <span class="log-form__title">{{ title }}</span>
          </div>
          <div class="log-form__group-btn js-btn"></div>
        </form>`;

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
        dataText: 'Ведите логин, не мение 3 символов',
        dataSize: '3',
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
    clName: 'log-form__btn log-form__btn_gray',
    type: 'link',
    url: '/registration.html'
  },
  btn: {
    text: 'Авторизоваться',
    clName: 'log-form__btn',
    type: 'button',
  }
};
const {formdata: {login, password}, btn, link}: IContext = context;

const page = new Page(context);
render('.container', page);

render('.js-form-group', new Input(login, 'log-form__control'));
render('.js-form-group', new Input(password, 'log-form__control'));

render('.js-btn', new Button(btn));
render('.js-btn', new Button(link));

const form = <HTMLDivElement>document.getElementsByClassName('log-form')[0];
if (form) {
  forma.listeners(form, false);
}
overviewShow();