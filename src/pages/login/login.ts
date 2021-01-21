import Block from '../../core/block';
import Button from '../../components/button/index';
import Input from '../../components/input/index';
import { template } from './template';
import { overviewShow } from '../../utils/overview';
import { forma } from '../../utils/form';
import { IContext, context } from './data';
import router from '../../router';
import { LoginAPI } from './login-api';

export class Login extends Block<IContext> {
  constructor() {
    const {
      formdata: { login, password },
      btn,
      link,
      title,
    }: IContext = context;
    super('main', '', {
      login: new Input(login).render(),
      password: new Input(password).render(),
      button: new Button(btn).render(),
      link: new Button(link).render(),
      title,
    });
  }

  signin(data: object) {
    new LoginAPI().create(data).then((data) => {
      const { status } = data;

      if (status === 200) {
        router.isProtect = false;
        router.go('/messege');
      } else if (status >= 500) {
        router.go('/500');
      } else {
        alert('Не правильный логин или пароль');
      }
    });
  }

  goRegistration() {
    router.go('/registration');
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const form = <HTMLDivElement>this.element.querySelector('.log-form');
      const link = <HTMLDivElement>this.element.querySelector('.js-btn a');
      if (form) {
        forma.listeners(form);

        form.addEventListener('submit', (event: Event) => {
          event.preventDefault();

          const inputs = form.querySelectorAll('input');
          const data = forma.send(inputs, false);
          if (data !== undefined && data !== null) {
            this.signin(data);
          }
        });
      }
      // перейти на страницу регистрации
      if (link) {
        link.addEventListener('click', (event: Event) => {
          event.preventDefault();
          this.goRegistration();
        });
      }
    });
    overviewShow();
  }

  render() {
    return template(this.props);
  }
}
