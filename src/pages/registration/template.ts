import {IContext} from './data';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const templ = `
    <form class="log-form js-form">
      <div class="js-form-group">
        <span class="log-form__title">{{ title }}</span>
        <div class="log-form__control">
            {{ email }}
        </div>
        <div class="log-form__control">
            {{ login }}
        </div>
        <div class="log-form__control">
            {{ first_name }}
        </div>
        <div class="log-form__control">
            {{ second_name }}
        </div>
        <div class="log-form__control">
            {{ phone }}
        </div>
        <div class="log-form__control">
            {{ password }}
        </div>
        <div class="log-form__control">
            {{ passwordAgain }}
        </div>
      </div>
      <div class="log-form__group-btn js-btn">
        {{ button }}
        {{ link }}
      </div>
    </form>`;

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
}