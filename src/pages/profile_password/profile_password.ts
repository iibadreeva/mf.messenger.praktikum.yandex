import Block from '../../core/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import Templator from '../../core/utils/templator/templator';
import Input from '../../components/input/index';
import {IContext, context} from './data';
import {UserAPI} from "../../core/modules/http/user-api";
import {host} from "../../core/modules/actions";
import router from "../../router";
import Modal from "../../components/modal/index";
import render from "../../core/utils/render";
import {overviewHide} from "../../core/utils/overview";
import {forma} from "../../core/utils/form";
import {ObjectKeyStringType} from "../../core/types";
import {ChangePasswordApi} from "./change-password-api";

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
        let {avatar}: IContext = context;

        if (data.avatar) {
          avatar.image = `${host}${data.avatar}`;
        }
        avatar.name = data.first_name;

        this.setProps({
          avatar: new Avatar(avatar).render(),
        })
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
          let reason = data || 'Не правильный пароль';
          alert(reason);
        }
      })
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
      })
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
    const {avatar,button, oldPassword, newPassword, passwordAgain} = this.props;
    const templ = `
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <form class="profile__form js-btn">
          <div class="js-avatar">${avatar}</div>
          <div class="profile__items js-form">
            <div class="profile__item">${oldPassword}</div>
            <div class="profile__item">${newPassword}</div>
            <div class="profile__item">${passwordAgain}</div>
          </div>
          ${button}
        </form>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}