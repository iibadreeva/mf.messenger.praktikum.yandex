import Block from '../../core/block';
import Avatar from '../../components/avatar/index';
import render from '../../core/utils/render';
import Input from '../../components/input/index';
import {IContext, context} from './data';

class Page extends Block<IContext> {
  constructor(props: IContext) {
    super('main', '', props);
  }

  render() {
    const {links} = this.props as unknown as IContext;
    const templ = `
        <main class="profile">
        <div class="profile__left">
          <div class="profile__left__arrow"><i class="fa fa-long-arrow-left"></i></div>
        </div>
        <div class="profile__form">
          <div class="js-avatar"></div>
          <div class="profile__items js-form"></div>
          <div class="profile__items">
            ${links.map(item => {
              return `<div class="profile__item">
                        <a class="profile__label ${item.className}" href="${item.url}">${item.name}</a>
                     </div>`
            })}
          </div>
        </div>
      </main>`;

    return templ;
  }
}

export const profile = () => {
  const {formdata: {email, login, firstName, lastName, phone}, avatar}: IContext = context;

  render('.container', new Page(context));
  render('.js-avatar', new Avatar(avatar));

  render('.js-form', new Input(email, 'profile__item'));
  render('.js-form', new Input(login, 'profile__item'));
  render('.js-form', new Input(firstName, 'profile__item'));
  render('.js-form', new Input(lastName, 'profile__item'));
  render('.js-form', new Input(phone, 'profile__item'));
}
