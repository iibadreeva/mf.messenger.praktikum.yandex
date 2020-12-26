import Block from '../../core/block';
import Button from '../../components/button/index';
import Avatar from '../../components/avatar/index';
import render from '../../core/utils/render';
import Templator from '../../core/utils/templator';
import checkProfile from '../../core/utils/check_profile';
import Input from '../../components/input/index';
import {IContext, context} from './data';

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

export const profilePassword = () => {
  const {formdata: {oldPassword, password, passwordAgain}, btn, avatar}: IContext = context;

  // Выстраиваем разметку
  render('.container', new Page(context));
  render('.js-form', new Input(oldPassword, 'profile__item'));
  render('.js-form', new Input(password, 'profile__item'));
  render('.js-form', new Input(passwordAgain, 'profile__item'));
  render('.js-btn', new Button(btn));

  render('.js-avatar', new Avatar(avatar));
  checkProfile();
}
