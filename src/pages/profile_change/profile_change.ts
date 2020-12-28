import Block from '../../core/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import Templator from '../../core/utils/templator';
import checkProfile from '../../core/utils/check_profile';
import showHamburger from '../../core/utils/show_hamburger';
import Input from '../../components/input/index';
import {IContext, context} from './data';
import {UserAPI} from "../../modules/http/user-api";
import {host} from "../../modules/actions";
import {forma} from "../../core/utils/form";
import {ChangeUserApi} from "./change-user-api";
import router from "../../router";
import {ObjectKeyStringType} from "../../core/types";

export class ProfileChange extends Block<IContext> {
  constructor() {
    const {formdata: {email, login, first_name, second_name, phone}, btn, avatar}: IContext = context;

    super(
      'main',
      'profile',
      {
        avatar: new Avatar(avatar).render(),
        email: new Input(email).render(),
        login: new Input(login).render(),
        first_name: new Input(first_name).render(),
        second_name: new Input(second_name).render(),
        phone: new Input(phone).render(),
        button: new Button(btn).render(),
      }
    );
    this.getData();
  }

  goBack() {
    router.go('/profile');
  }

  getData() {
    new UserAPI()
      .request()
      .then(res => JSON.parse(res.data))
      .then(data => {
        this.setData(data);
      });
  }

  setData(data: ObjectKeyStringType) {
    let {formdata: {email, login, first_name, second_name, phone}, avatar}: IContext = context;

    email.config.value = data.email;
    login.config.value = data.login;
    first_name.config.value = data.first_name;
    second_name.config.value = data.second_name;
    phone.config.value = data.phone;
    if (data.avatar) {
      avatar.image = `${host}${data.avatar}`;
    }
    avatar.name = data.first_name;

    this.setProps({
      email: new Input(email).render(),
      login: new Input(login).render(),
      first_name: new Input(first_name).render(),
      second_name: new Input(second_name).render(),
      phone: new Input(phone).render(),
      avatar: new Avatar(avatar).render(),
    })
  }

  componentDidMount(): void {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const hamburgerBtn = this.element.querySelectorAll('.js-hamburger');
      const avatar = <HTMLInputElement>this.element.querySelector('#avatar');
      const image = <HTMLImageElement>this.element.querySelector('.profile__image');
      const form = <HTMLDivElement>this.element.querySelector('.profile__form');
      const back = <HTMLDivElement>this.element.querySelector('.profile__left');

      if (form) {
        forma.listeners(form);

        form.addEventListener('submit', (event: Event) => {
          event.preventDefault();

          const inputs = form.querySelectorAll('input');
          const data = forma.send(inputs, false);
          if (data !== undefined && data !== null) {
            data.display_name = `${data.first_name} ${data.second_name}`;

            if (data !== undefined && data !== null) {
              this.updateUser(data, avatar);
            }
          }
        });
      }

      if(back) {
        back.addEventListener('click', this.goBack);
      }

      checkProfile();
      showHamburger(hamburgerBtn);
      this.loadAvatar(avatar, image);
    });
  }

  loadAvatar(avatar: HTMLInputElement, image: HTMLImageElement) {
    const fileReading = new FileReader();
    fileReading.addEventListener('load', function () {
      if (typeof this.result === "string") {
        image.src = this.result;
      }
    });

    if (avatar) {
      avatar.addEventListener('change', function (evt: Event) {
        const input = evt.target as HTMLInputElement;
        if (!input.files?.length) {
          return;
        }
        const file = input.files[0];
        fileReading.readAsDataURL(file);
      });
    }
  }

  updateAvatar(input: HTMLInputElement) {
    const formData = new FormData();
    if (!input.files?.length) {
      return;
    }
    formData.append('avatar', input.files[0]);

    new ChangeUserApi()
      .updateAvatar(formData)
      .then(res => {
        const { status, data } = res;

        if(status === 200) {
          let res = JSON.parse(data);
          this.setData(res);

          alert('Данные успешно заменены');
        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      });
  }

  updateUser(data: ObjectKeyStringType, input: HTMLInputElement) {
    new ChangeUserApi()
      .update(data)
      .then(res => {
        const { status } = res;

        if(status === 200) {

          if (input.files?.length) {
            this.updateAvatar(input);
          } else {
            this.setData(data);
            alert('Данные успешно заменены');
          }

        } else if (status >= 500) {
          router.go('/500');
        } else {
          alert('Произошла ошибка');
        }
      });
  }

  render() {
    const {avatar,button, email, login, first_name, second_name, phone} = this.props;

    const templ = `
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <input id="avatar" type="file" data-type="avatar" accept="image/*">
        <form class="profile__form">
          <div class="js-avatar">
            ${avatar}
          </div>
          <div class="profile__items js-form">
            <div class="profile__item">${email}</div>
            <div class="profile__item">${login}</div>
            <div class="profile__item">${first_name}</div>
            <div class="profile__item">${second_name}</div>
            <div class="profile__item">${phone}</div>
          </div>
          ${button}
        </form>
      `;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}