import { IContext } from './index';
import Templator from '../../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const templ = `
    <div class="messenger__header__photo">
      <img class="messenger__header__image" src="{{ image }}">
    </div>
    <div class="messenger__header__hamburger js-hamburger" data-type="profile">
        <i class="fa fa-bars"></i>
    </div>`;

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
};
