import { IContext, ButtonType } from './index';
import Templator from '../../utils/templator/templator';

export const template = (props: Record<string, IContext>) => {
  let templ = '';
  const { type } = (props as unknown) as IContext;

  switch (type) {
    case ButtonType.Link:
      templ = `
        <a
          class="log-form__btn log-form__btn_gray"
          href="{{ url }}"
        >
          {{ text }}
        </a>`;
      break;
    default:
      templ = `
        <button
          class="{{ clName }}"
         >
          {{ text }}
         </button>`;
  }

  const tmpl = new Templator(templ);
  return tmpl.compile(props);
};
