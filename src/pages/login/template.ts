import { IContext } from './data';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  const templ = `
    <form class="log-form js-form">
      <div>
        <span class="log-form__title">{{ title }}</span>
        <div class="log-form__control">
            {{ login }}
        </div>
        <div class="log-form__control">
            {{ password }}
        </div>
      </div>
      <div class="log-form__group-btn js-btn">
        {{ button }}
        {{ link }}
      </div>
    </form>`;

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
};
