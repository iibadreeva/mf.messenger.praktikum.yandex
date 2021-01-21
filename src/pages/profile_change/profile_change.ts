import Block from '../../core/block';
import { IContext, context } from './data';
import { template } from './template';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import showHamburger from '../../utils/show_hamburger';
import Input from '../../components/input/index';
import { UserAPI } from '../../core/modules/http/user-api';
import { host } from '../../core/modules/actions';
import { forma } from '../../utils/form';
import { ChangeUserApi } from './change-user-api';
import router from '../../router';
import { ObjectKeyStringType } from '../../types';
import Modal from '../../components/modal/index';
import render from '../../utils/render';
import { overviewHide } from '../../utils/overview';

export class ProfileChange extends Block<IContext> {
  constructor() {
    const {
      formdata: { email, login, first_name, second_name, phone },
      btn,
      avatar,
    }: IContext = context;

    super('main', 'profile', {
      avatar: new Avatar(avatar).render(),
      email: new Input(email).render(),
      login: new Input(login).render(),
      first_name: new Input(first_name).render(),
      second_name: new Input(second_name).render(),
      phone: new Input(phone).render(),
      button: new Button(btn).render(),
    });
    this.getData();
  }

  componentDidMount(): void {
    const popub = this.pupub();
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const avatar = <HTMLInputElement>this.element.querySelector('#avatar');
      const image = <HTMLImageElement>(
        this.element.querySelector('.profile__image')
      );
      const form = <HTMLDivElement>this.element.querySelector('.profile__form');
      const back = <HTMLDivElement>this.element.querySelector('.profile__left');

      if (form) {
        this.checkForm(form, avatar, popub);
      }

      if (back) {
        back.addEventListener('click', this.goBack);
      }

      this.loadAvatar(avatar, image);
    });
    showHamburger(undefined);
  }

  goBack() {
    router.go('/profile');
  }

  getData() {
    new UserAPI()
      .request()
      .then((res) => JSON.parse(res.data))
      .then((data) => {
        this.setData(data);
      });
  }

  updateUser(data: ObjectKeyStringType, input: HTMLInputElement) {
    new ChangeUserApi().update(data).then((res) => {
      const { status } = res;

      if (status === 200) {
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

  updateAvatar(input: HTMLInputElement) {
    const formData = new FormData();
    if (!input.files?.length) {
      return;
    }
    formData.append('avatar', input.files[0]);

    new ChangeUserApi().updateAvatar(formData).then((res) => {
      const { status, data } = res;

      if (status === 200) {
        const res = JSON.parse(data);
        this.setData(res);

        alert('Данные успешно заменены');
      } else if (status >= 500) {
        router.go('/500');
      } else {
        alert('Произошла ошибка');
      }
    });
  }

  setData(data: ObjectKeyStringType) {
    const {
      formdata: { email, login, first_name, second_name, phone },
      avatar,
    }: IContext = context;

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
    });
  }

  loadAvatar(avatar: HTMLInputElement, image: HTMLImageElement) {
    const fileReading = new FileReader();
    fileReading.addEventListener('load', function () {
      if (typeof this.result === 'string') {
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

  pupub() {
    // Подготавливаем мадальное окно
    const { modal }: IContext = context;
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

  checkForm(form: HTMLDivElement, avatar: HTMLInputElement, popub: object) {
    forma.listeners(form);

    form.addEventListener('submit', (event: Event) => {
      event.preventDefault();

      const inputs = form.querySelectorAll('input');
      const data = forma.send(inputs, popub);
      if (data !== undefined && data !== null) {
        data.display_name = `${data.first_name} ${data.second_name}`;

        if (data !== undefined && data !== null) {
          this.updateUser(data, avatar);
        }
      }
    });
  }

  render() {
    return template(this.props);
  }
}
