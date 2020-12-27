import Block from '../../core/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import Templator from '../../core/utils/templator';
import checkProfile from '../../core/utils/check_profile';
import showHamburger from '../../core/utils/show_hamburger';
import Input from '../../components/input/index';
import {IContext, context} from './data';

/*
class Page extends Block<IContext> {
  constructor(props: IContext) {
    super('main', 'error', props);
  }

  render() {
    const templ = `
        <main class="profile">
        <a href="{{ goBack }}"  class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </a>
        <form class="profile__form js-btn">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
        </form>
      </main>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}

export const profileChange = () => {
  const {formdata: {email, login, firstName, lastName, phone}, btn, avatar}: IContext = context;

// Выстраиваем разметку
  render('.container', new Page(context));
  render('.js-form', new Input(email, 'profile__item'));
  render('.js-form', new Input(login, 'profile__item'));
  render('.js-form', new Input(firstName, 'profile__item'));
  render('.js-form', new Input(lastName, 'profile__item'));
  render('.js-form', new Input(phone, 'profile__item'));
  render('.js-btn', new Button(btn));
  render('.js-avatar', new Avatar(avatar));

  checkProfile();
  showHamburger();
}*/

export class ProfileChange extends Block<IContext> {
  constructor() {
    const {formdata: {email, login, firstName, lastName, phone}, btn, avatar}: IContext = context;

    super(
      'main',
      '',
      {
        avatar: new Avatar(avatar).render(),
        email: new Input(email).render(),
        login: new Input(login).render(),
        first_name: new Input(firstName).render(),
        second_name: new Input(lastName).render(),
        phone: new Input(phone).render(),
        button: new Button(btn).render(),
      }
    );
  }

  componentDidMount(): void {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const hamburgerBtn = this.element.querySelectorAll('.js-hamburger');

      checkProfile();
      showHamburger(hamburgerBtn);
    });
  }

  render() {
    const {avatar,button, email, login, first_name, second_name, phone} = this.props;

    const templ = `
        <main class="profile">
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
          <input type="file" name="avatar" accept="image/*">
        </div>
        <form class="profile__form js-btn">
          <div class="js-avatar">${avatar}</div>
          <div class="profile__items js-form">
            <div class="profile__item">${email}</div>
            <div class="profile__item">${login}</div>
            <div class="profile__item">${first_name}</div>
            <div class="profile__item">${second_name}</div>
            <div class="profile__item">${phone}</div>
          </div>
          ${button}
        </form>
      </main>`;

    const tmpl = new Templator(templ);
    return tmpl.compile(this.props);
  }
}