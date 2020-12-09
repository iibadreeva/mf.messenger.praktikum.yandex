import Block from '../../core/block.js';
import Button from '../../components/button/index.js';
import Avatar from '../../components/avatar/index.js';
import render from '../../core/utils/render.js';
import Templator from '../../core/utils/templator.js';
import checkProfile from '../../core/utils/check_profile.js';
import showHamburger from '../../core/utils/show_hamburger.js';
import Input from '../../components/input/index.js';
import {IContext, context} from './data.js';

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