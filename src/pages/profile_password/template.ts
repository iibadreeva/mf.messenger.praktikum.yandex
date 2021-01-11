import {IContext} from './data';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const {avatar,button, oldPassword, newPassword, passwordAgain} = props;
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
  return tmpl.compile(props);
}