import Block from '../../core/block';
import Button from '../../components/button/index';
import Input from '../../components/input/index';
import Templator from '../../core/utils/templator/templator';
import {overviewShow} from '../../core/utils/overview';
import {forma} from '../../core/utils/form';
import {IContext, context} from './data'
import router from "../../router";
import {RegistrationUserApi} from "./registration-user-api";

export class Registration extends Block<IContext> {
  constructor() {
    const {formdata: {email, login, first_name, second_name, phone, password, passwordAgain}, btn, link, title}: IContext = context;

    super(
      'main',
      '',
      {
        email: new Input(email).render(),
        login: new Input(login).render(),
        first_name: new Input(first_name).render(),
        second_name: new Input(second_name).render(),
        phone: new Input(phone).render(),
        password: new Input(password).render(),
        passwordAgain: new Input(passwordAgain).render(),
        button: new Button(btn).render(),
        link: new Button(link).render(),
        title
      }
    );
  }

  registration(data:object) {
    new RegistrationUserApi()
      .create(data)
      .then((res) => {
        const { status, data } = res;

        if(status === 200) {
          router.isProtect = false;
          router.go('/chat');
        } else if (status >= 500) {
          router.go('/500');
        } else {
          let reason = JSON.parse(data).reason || 'Не правильные данные';
          alert(reason);
        }
      })
  }

  goLogin() {
    router.go('/login');
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
            this.registration(data);
          }
        });
      }
      // перейти на страницу формы входа в систему
      if(link) {
        link.addEventListener('click', (event: Event) => {
          event.preventDefault();
          this.goLogin();
        });
      }
    });
    overviewShow()
  }

  render() {
    const templ = `
        <form class="log-form js-form">
          <div class="js-form-group">
            <span class="log-form__title">{{ title }}</span>
            <div class="log-form__control">
                {{ email }}
            </div>
            <div class="log-form__control">
                {{ login }}
            </div>
            <div class="log-form__control">
                {{ first_name }}
            </div>
            <div class="log-form__control">
                {{ second_name }}
            </div>
            <div class="log-form__control">
                {{ phone }}
            </div>
            <div class="log-form__control">
                {{ password }}
            </div>
            <div class="log-form__control">
                {{ passwordAgain }}
            </div>
          </div>
          <div class="log-form__group-btn js-btn">
            {{ button }}
            {{ link }}
          </div>
        </form>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}
