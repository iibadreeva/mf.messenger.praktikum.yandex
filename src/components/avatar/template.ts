import { IContext } from './index';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const templ = `
    <div class="profile__heaed">
      <div class="profile__photo">
        <img class="profile__image" src="{{ image }}">
        ${
          props.change
            ? `
          <div class="profile__placeholder js-hamburger" data-type="avatar">
            <div class="profile__placeholder__text">Поменять <br>аватар
            </div>
          </div>`
            : ''
        }
      </div>
      <div class="profile__name">{{ name }}</div>
    </div>`;

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
};
