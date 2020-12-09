import Block from '../../core/block.js';
import Avatar from '../../components/avatar/index.js';
import render from '../../core/utils/render.js';
import Input from '../../components/input/index.js';
import {IContext, context} from './data.js';

class Page extends Block<IContext> {
  constructor(props: IContext) {
    super('main', 'error', props);
  }

  render() {
    const {links} = this.props;
    const templ = `
        <main class="profile">
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <div class="profile__form">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
          <div class="profile__items">
            ${Object.keys(links).map(function(key) {
    return `<div class="profile__item">
                        <a class="profile__label ${links[key].className}" href="${links[key].url}">${links[key].name}</a>
                     </div>`;
  }).join('')}
          </div>
        </div>
      </main>`;

    return templ;
  }
}

const {formdata: {email, login, firstName, lastName, phone}, avatar}: IContext = context;

render('.container', new Page(context));
render('.js-avatar', new Avatar(avatar));

render('.js-form', new Input(email, 'profile__item'));
render('.js-form', new Input(login, 'profile__item'));
render('.js-form', new Input(firstName, 'profile__item'));
render('.js-form', new Input(lastName, 'profile__item'));
render('.js-form', new Input(phone, 'profile__item'));
