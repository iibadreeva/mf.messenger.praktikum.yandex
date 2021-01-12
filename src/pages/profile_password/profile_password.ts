import Block from '../../core/block';
import {IContext, context} from './data';
import {template} from './template';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import Input from '../../components/input/index';
import {UserAPI} from '../../core/modules/http/user-api';
import {host} from '../../core/modules/actions';
import router from '../../router';
import Modal from '../../components/modal/index';
import render from '../../utils/render';
import {overviewHide} from '../../utils/overview';
import {forma} from '../../utils/form';
import {ObjectKeyStringType} from '../../types';
import {ChangePasswordApi} from './change-password-api';

export class ProfilePassword extends Block<IContext> {
  constructor() {
    const {formdata: {oldPassword, newPassword, passwordAgain}, btn, avatar}: IContext = context;

    super(
      'main',
      'profile',
      {
        avatar: new Avatar(avatar).render(),
        oldPassword: new Input(oldPassword).render(),
        newPassword: new Input(newPassword).render(),
        passwordAgain: new Input(passwordAgain).render(),
        button: new Button(btn).render(),
      }
    );
    this.getData();
  }

  componentDidMount(): void {
    const popub = this.pupub();

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const form = <HTMLDivElement>this.element.querySelector('.profile__form');
      const back = <HTMLDivElement>this.element.querySelector('.profile__left');

      if (form) {
        this.checkForm(form, popub);
      }

      if(back) {
        back.addEventListener('click', this.goBack);
      }
    });
  }

  getData() {
    new UserAPI()
      .request()
      .then(res => JSON.parse(res.data))
      .then(data => {
        const {avatar}: IContext = context;

        if (data.avatar) {
          avatar.image = `${host}${data.avatar}`;
        }
        avatar.name = data.first_name;

        this.setProps({
          avatar: new Avatar(avatar).render(),
        });
      });
  }

  updatePassword(data: ObjectKeyStringType) {
    new ChangePasswordApi()
      .update(data)
      .then(res => {
        const { status, data } = res;

        if(status === 200) {
          alert('Данные успешно заменены');
        } else if (status >= 500) {
          router.go('/500');
        } else {
          const reason = data || 'Не правильный пароль';
          alert(reason);
        }
      });
  }

  pupub() {
    // Подготавливаем мадальное окно
    const {modal}: IContext = context;
    const popub = new Modal(modal);
    popub.hide();
    render('.container', popub);

    const btnModal = document.querySelector('.js-modal-btn');
    if (btnModal) {
      btnModal.addEventListener('click', () => {
        popub.hide();
        overviewHide();
      });
    }

    return popub;
  }

  checkForm(form: HTMLDivElement, popub: object) {
    forma.listeners(form);

    form.addEventListener('submit', (event: Event) => {
      event.preventDefault();

      const inputs = form.querySelectorAll('input');
      const data = forma.send(inputs, popub);
      if (data !== undefined && data !== null) {
        this.updatePassword(data);
      }
    });
  }

  goBack() {
    router.go('/profile');
  }

  render() {
    return template(this.props);
  }
}