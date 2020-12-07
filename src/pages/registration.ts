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
    email: IInput,
    login: IInput,
    firstName: IInput,
    lastName: IInput,
    phone: IInput,
    password: IInput,
    passwordAgain: IInput
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
  title: 'Регистрация',
  formdata: {
    email: {
      type: 'lightForm',
      config: {
        type: 'email',
        placeholder: 'Почта',
        dataType: 'email',
        dataText: 'Email введен некорректно',
        value: ''
      }
    },
    login: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Логин',
        dataType: 'login',
        dataSize: '3',
        dataText: 'Ведите логин, не мение 3 символов',
        value: ''
      }
    },
    firstName: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Имя',
        dataType: 'text',
        dataText: 'Поле не должно быть пустое',
        value: ''
      }
    },
    lastName: {
      type: 'lightForm',
      config: {
        type: 'text',
        placeholder: 'Фамилия',
        dataType: 'text',
        dataText: 'Поле не должно быть пустое',
        value: ''
      }
    },
    phone: {
      type: 'lightForm',
      config: {
        type: 'tel',
        placeholder: 'Телефон',
        dataType: 'phone',
        dataText: 'Телефон не соответствует +79999999999',
        value: ''
      }
    },
    password: {
      type: 'lightForm',
      config: {
        type: 'password',
        placeholder: 'Пароль',
        dataType: 'password',
        dataText: '',
        value: ''
      }
    },
    passwordAgain: {
      type: 'lightForm',
      config: {
        type: 'password',
        placeholder: 'Пароль (еще раз)',
        dataType: 'password_again',
        dataText: 'Пароли не совпадают',
        value: ''
      }
    }
  },
  link: {
    text: 'Войти',
    clName: 'log-form__btn log-form__btn_gray',
    type: 'link',
    url: '/login.html'
  },
  btn: {
    text: 'Зарегистрироваться',
    clName: 'log-form__btn',
    type: 'button',
  }
};
const {formdata: {email, login, firstName, lastName, phone, password, passwordAgain}, btn, link}: IContext = context;

const page = new Page(context);
render('.container', page);

render('.js-form-group', new Input(email, 'log-form__control'));
render('.js-form-group', new Input(login, 'log-form__control'));
render('.js-form-group', new Input(firstName, 'log-form__control'));
render('.js-form-group', new Input(lastName, 'log-form__control'));
render('.js-form-group', new Input(phone, 'log-form__control'));
render('.js-form-group', new Input(password, 'log-form__control'));
render('.js-form-group', new Input(passwordAgain, 'log-form__control'));

render('.js-btn', new Button(btn));
render('.js-btn', new Button(link));

const form = <HTMLDivElement>document.getElementsByClassName('log-form')[0];
if (form) {
  forma.listeners(form, false);
}
overviewShow();