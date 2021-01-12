import { IContext } from './data';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const {
    avatar,
    button,
    email,
    login,
    first_name,
    second_name,
    phone,
  } = props;

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
    </form>`;

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
};
